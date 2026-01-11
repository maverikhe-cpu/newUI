import React, { useEffect, useRef, useState } from 'react';

/**
 * NeuralNetwork - Creates an animated neural network visualization
 * Features interconnected nodes with data pulse animations
 */
const NeuralNetwork = ({ nodeCount = 15, width = 300, height = 200, style = {}, className = '' }) => {
    const svgRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [connections, setConnections] = useState([]);
    const pulsesRef = useRef([]);

    // Generate nodes and connections
    useEffect(() => {
        const newNodes = [];
        const newConnections = [];

        // Create nodes with layered structure (input -> hidden -> output)
        const layers = [3, 6, 6, 3]; // Number of nodes per layer
        let nodeId = 0;

        layers.forEach((count, layerIndex) => {
            const layerX = (layerIndex / (layers.length - 1)) * width;
            for (let i = 0; i < count; i++) {
                const layerY = ((i + 1) / (count + 1)) * height;
                newNodes.push({
                    id: nodeId++,
                    x: layerX,
                    y: layerY,
                    layer: layerIndex,
                    radius: 4 + Math.random() * 3,
                });
            }
        });

        // Create connections between adjacent layers
        let nodeIdx = 0;
        layers.forEach((count, layerIndex) => {
            if (layerIndex < layers.length - 1) {
                const currentLayerStart = nodeIdx;
                const nextLayerStart = nodeIdx + count;
                const nextLayerCount = layers[layerIndex + 1];

                for (let i = 0; i < count; i++) {
                    // Connect to random nodes in next layer
                    const connectionsCount = 1 + Math.floor(Math.random() * 3);
                    for (let j = 0; j < connectionsCount; j++) {
                        const targetIndex = nextLayerStart + Math.floor(Math.random() * nextLayerCount);
                        newConnections.push({
                            from: currentLayerStart + i,
                            to: targetIndex,
                        });
                    }
                }
            }
            nodeIdx += count;
        });

        setNodes(newNodes);
        setConnections(newConnections);
    }, [nodeCount, width, height]);

    // Animate data pulses
    useEffect(() => {
        if (!svgRef.current || connections.length === 0) return;

        const createPulse = () => {
            const connection = connections[Math.floor(Math.random() * connections.length)];
            const fromNode = nodes[connection.from];
            const toNode = nodes[connection.to];

            if (!fromNode || !toNode) return;

            const pulse = {
                id: Date.now() + Math.random(),
                from: fromNode,
                to: toNode,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
            };

            pulsesRef.current.push(pulse);
        };

        // Create initial pulses
        const interval = setInterval(createPulse, 200);

        // Animation loop
        let animationId;
        const animate = () => {
            pulsesRef.current = pulsesRef.current.filter(pulse => {
                pulse.progress += pulse.speed;
                return pulse.progress <= 1;
            });

            // Update SVG
            const svg = svgRef.current;
            if (svg) {
                // Remove old pulse elements
                const oldPulses = svg.querySelectorAll('.data-pulse');
                oldPulses.forEach(p => p.remove());

                // Add new pulse elements
                pulsesRef.current.forEach(pulse => {
                    const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
                    const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', x);
                    circle.setAttribute('cy', y);
                    circle.setAttribute('r', 3);
                    circle.setAttribute('fill', '#00F0FF');
                    circle.setAttribute('class', 'data-pulse');
                    circle.style.filter = 'drop-shadow(0 0 6px #00F0FF)';
                    circle.style.opacity = 1 - pulse.progress * 0.5;

                    svg.appendChild(circle);
                });
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            clearInterval(interval);
            cancelAnimationFrame(animationId);
        };
    }, [connections, nodes]);

    // Merge default styles with passed styles
    const defaultStyle = { position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity: 0.6, zIndex: 0 };
    const mergedStyle = { ...defaultStyle, ...style };

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            style={mergedStyle}
            className={className}
        >
            <defs>
                <filter id="neural-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0, 240, 255, 0.1)" />
                    <stop offset="50%" stopColor="rgba(0, 240, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(0, 240, 255, 0.1)" />
                </linearGradient>
            </defs>

            {/* Draw connections */}
            {connections.map((conn, idx) => {
                const from = nodes[conn.from];
                const to = nodes[conn.to];
                if (!from || !to) return null;
                return (
                    <line
                        key={`conn-${idx}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="url(#connection-gradient)"
                        strokeWidth="1"
                        opacity="0.4"
                    />
                );
            })}

            {/* Draw nodes */}
            {nodes.map(node => (
                <g key={`node-${node.id}`}>
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius + 2}
                        fill="rgba(0, 240, 255, 0.1)"
                        opacity="0.5"
                    />
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius}
                        fill="#0B1026"
                        stroke="#00F0FF"
                        strokeWidth="1.5"
                        filter="url(#neural-glow)"
                    >
                        <animate
                            attributeName="r"
                            values={`${node.radius};${node.radius + 1};${node.radius}`}
                            dur={`${2 + Math.random() * 2}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            ))}
        </svg>
    );
};

export default NeuralNetwork;
