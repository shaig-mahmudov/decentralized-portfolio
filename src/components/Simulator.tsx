import { useState, useEffect, useRef } from 'react';
import { Play, Square, Flame, ShieldAlert, Terminal, Settings, RefreshCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface TelemetryPoint {
  time: string;
  latency: number;
  successRate: number;
  requests: number;
}

export default function Simulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [rps, setRps] = useState(30);
  const [endpoint, setEndpoint] = useState('/api/v1/payment');
  const [hasSpike, setHasSpike] = useState(false);
  const [hasLimit, setHasLimit] = useState(false);
  const [circuitBreaker, setCircuitBreaker] = useState('CLOSED'); // CLOSED, OPEN, HALF-OPEN

  // Telemetry Metrics
  const [latency, setLatency] = useState(0);
  const [successRate, setSuccessRate] = useState(100);
  const [http200, setHttp200] = useState(0);
  const [http429, setHttp429] = useState(0);
  const [http500, setHttp500] = useState(0);
  
  const [chartData, setChartData] = useState<TelemetryPoint[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  
  const logContainerRef = useRef<HTMLDivElement>(null);
  const tickCounter = useRef(0);

  // Scroll to bottom of terminal logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulation Tick Loop
  useEffect(() => {
    let interval: any;
    
    if (isRunning) {
      // Print start log
      addLog(`[SYSTEM] Load test simulation started on endpoint ${endpoint} at ${rps} RPS.`);
      
      interval = setInterval(() => {
        tickCounter.current += 1;
        const timeStr = `${tickCounter.current}s`;

        // Calculate load details
        let currentRps = rps;
        if (hasSpike) {
          currentRps = Math.floor(rps * 2.5 + Math.random() * 20);
        }

        // Calculate latency and errors
        let baseLatency = 30 + Math.random() * 20; // 30-50ms
        let currentSuccess = 100;
        let count200 = 0;
        let count429 = 0;
        let count500 = 0;

        if (hasSpike) {
          baseLatency += 120 + Math.random() * 60; // Load increases latency
        }

        if (hasLimit && currentRps > 45) {
          // Trigger rate limits
          count429 = Math.floor(currentRps * 0.4);
          count200 = currentRps - count429;
          baseLatency += 10; // Extra overhead
          currentSuccess = Math.floor((count200 / currentRps) * 100);
          setCircuitBreaker('HALF-OPEN');
        } else if (hasSpike && currentRps > 80) {
          // Servers struggle under high spike
          count500 = Math.floor(currentRps * 0.15);
          count200 = currentRps - count500;
          baseLatency += 200;
          currentSuccess = Math.floor((count200 / currentRps) * 100);
          setCircuitBreaker('OPEN');
        } else {
          count200 = currentRps;
          setCircuitBreaker('CLOSED');
        }

        const finalLatency = Math.round(baseLatency);
        
        // Update states
        setLatency(finalLatency);
        setSuccessRate(currentSuccess);
        setHttp200(prev => prev + count200);
        setHttp429(prev => prev + count429);
        setHttp500(prev => prev + count500);

        // Update chart data (max 15 items)
        setChartData(prev => {
          const nextData = [...prev, {
            time: timeStr,
            latency: finalLatency,
            successRate: currentSuccess,
            requests: currentRps
          }];
          return nextData.slice(-15);
        });

        // Add logger terminal logs
        const timestamp = new Date().toLocaleTimeString();
        if (count429 > 0) {
          addLog(`[${timestamp}] WARN: [wreckr] HTTP 429 Too Many Requests on ${endpoint}. Rate-limited ${count429} calls.`);
        } else if (count500 > 0) {
          addLog(`[${timestamp}] ERROR: [wreckr] HTTP 500 Internal Server Error. Server congestion detected.`);
        } else {
          addLog(`[${timestamp}] INFO: [autoreq] ${count200} requests successful. Latency: ${finalLatency}ms. CB State: ${circuitBreaker}`);
        }

      }, 1000);
    } else {
      setLatency(0);
      setSuccessRate(100);
      setCircuitBreaker('CLOSED');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, rps, endpoint, hasSpike, hasLimit, circuitBreaker]);

  const addLog = (logMsg: string) => {
    setLogs(prev => [...prev, logMsg].slice(-50)); // Max 50 logs in history
  };

  const handleStartStop = () => {
    if (isRunning) {
      addLog(`[SYSTEM] Load test simulation stopped.`);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setChartData([]);
    setLogs([]);
    setHttp200(0);
    setHttp429(0);
    setHttp500(0);
    setLatency(0);
    setSuccessRate(100);
    setIsRunning(false);
  };

  return (
    <section id="simulator" className="relative py-24 overflow-hidden">
      {/* Glows */}
      <div className="absolute right-0 top-1/4 ambient-glow-large" />
      <div className="absolute left-10 bottom-10 ambient-glow" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-medium mb-3 block">Resilience Lab</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Backend load simulator</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-slate-400 font-light">
            Test backend resilience concepts. Simulate HTTP requests, analyze performance metrics in real-time, and watch how system throttle components handle loads.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left panel: Simulation Controls */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-dark-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 text-white font-serif font-bold text-lg">
                <Settings className="w-5 h-5 text-gold" />
                <h4>Control Console</h4>
              </div>

              {/* Endpoint selection */}
              <div className="mb-6">
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-2">Target Endpoint</label>
                <select 
                  value={endpoint} 
                  onChange={(e) => setEndpoint(e.target.value)}
                  disabled={isRunning}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/50 cursor-pointer"
                >
                  <option value="/api/v1/payment">POST /api/v1/payment (Sensitive)</option>
                  <option value="/api/v1/user">GET /api/v1/user (Standard)</option>
                  <option value="/api/v1/telemetry">POST /api/v1/telemetry (Heavy)</option>
                </select>
              </div>

              {/* RPS slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Base Request Rate</label>
                  <span className="text-sm text-gold font-mono font-bold">{rps} RPS</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={rps} 
                  onChange={(e) => setRps(Number(e.target.value))}
                  className="w-full h-1.5 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              {/* Simulation triggers */}
              <div className="space-y-4 mb-8">
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Chaos Injectors</label>
                
                {/* Spike */}
                <button
                  onClick={() => setHasSpike(!hasSpike)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                    hasSpike 
                      ? 'border-red-500/50 bg-red-950/20 text-red-400' 
                      : 'border-dark-border bg-dark-bg/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs font-semibold">Simulate Traffic Spike (2.5x Load)</span>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    hasSpike ? 'bg-red-500/20' : 'bg-slate-800'
                  }`}>{hasSpike ? 'ON' : 'OFF'}</span>
                </button>

                {/* Limit */}
                <button
                  onClick={() => setHasLimit(!hasLimit)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                    hasLimit 
                      ? 'border-gold/50 bg-gold/5 text-gold-light' 
                      : 'border-dark-border bg-dark-bg/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-xs font-semibold">Induce Rate Limiting (429)</span>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    hasLimit ? 'bg-gold/20' : 'bg-slate-800'
                  }`}>{hasLimit ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Run Button triggers */}
            <div className="flex items-center gap-4 pt-4 border-t border-dark-border/40">
              <button
                onClick={handleStartStop}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isRunning 
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:bg-red-500' 
                    : 'bg-gradient-to-r from-gold to-gold-dark text-dark-bg shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4 fill-white" />
                    Stop Test
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-dark-bg" />
                    Dispatch Load
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="p-3 rounded-xl border border-dark-border bg-dark-bg/50 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                title="Reset simulation telemetry"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel: Telemetry Metrics & Graph */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Top row: Live counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Latency */}
              <div className="glass-panel p-4 rounded-xl border border-dark-border text-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">Latency</span>
                <span className="text-2xl font-mono font-bold text-white">
                  {isRunning ? `${latency} ms` : '—'}
                </span>
              </div>
              
              {/* Success rate */}
              <div className="glass-panel p-4 rounded-xl border border-dark-border text-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">Success Rate</span>
                <span className={`text-2xl font-mono font-bold ${
                  successRate < 80 ? 'text-red-400' : successRate < 100 ? 'text-gold' : 'text-green-400'
                }`}>
                  {isRunning ? `${successRate}%` : '100%'}
                </span>
              </div>

              {/* HTTP 200 count */}
              <div className="glass-panel p-4 rounded-xl border border-dark-border text-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">HTTP 200 (OK)</span>
                <span className="text-2xl font-mono font-bold text-slate-300">{http200}</span>
              </div>

              {/* Failures (429/500) */}
              <div className="glass-panel p-4 rounded-xl border border-dark-border text-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">Failures</span>
                <span className={`text-2xl font-mono font-bold ${
                  (http429 + http500) > 0 ? 'text-red-500' : 'text-slate-500'
                }`}>
                  {http429 + http500}
                </span>
              </div>
            </div>

            {/* Middle row: Live telemetry line chart */}
            <div className="glass-panel p-6 rounded-2xl border border-dark-border h-[280px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
                  <BarChart2 className="w-4 h-4 text-gold" />
                  <h5>Real-Time Performance Telemetry</h5>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold tracking-wider">
                  <span className="flex items-center gap-1.5 text-gold-accent">
                    <span className="w-2 h-2 rounded-full bg-gold-accent" /> LATENCY (MS)
                  </span>
                  <span className="flex items-center gap-1.5 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400" /> SUCCESS RATE (%)
                  </span>
                </div>
              </div>
              
              <div className="w-full h-full pb-8">
                {chartData.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 text-xs font-light">
                    <span>No telemetry data available.</span>
                    <span>Click 'Dispatch Load' to begin telemetry capturing.</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid stroke="#1F1F24" strokeDasharray="3 3" />
                      <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                      <YAxis stroke="#475569" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111113', borderColor: '#D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#94A3B8', fontFamily: 'monospace' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#E5A93C" 
                        strokeWidth={2}
                        dot={false}
                        name="Latency (ms)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="successRate" 
                        stroke="#4ADE80" 
                        strokeWidth={2}
                        dot={false}
                        name="Success Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Bottom row: Live Scrolling Console Logger */}
            <div className="glass-panel p-4 rounded-xl border border-dark-border flex flex-col h-[180px]">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-dark-border text-xs text-slate-500 font-mono">
                <Terminal className="w-3.5 h-3.5 text-gold" />
                <span>TELEMETRY CONSOLE OUTPUT (WRECKR-TELEMETRYD)</span>
              </div>
              <div 
                ref={logContainerRef}
                className="flex-1 overflow-y-auto font-mono text-[11px] text-slate-400 space-y-1.5 scroll-smooth pr-2"
              >
                {logs.length === 0 ? (
                  <span className="text-slate-600 italic">Console idle. Awaiting load script output...</span>
                ) : (
                  logs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`${
                        log.includes('WARN:') 
                          ? 'text-gold-light' 
                          : log.includes('ERROR:') 
                          ? 'text-red-400 font-semibold' 
                          : log.includes('[SYSTEM]') 
                          ? 'text-gold font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
