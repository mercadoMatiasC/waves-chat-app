export function SVGDefinitions() {
    return (
        <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
            <defs>
                <linearGradient id="main-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#13e3ff" />
                    <stop offset="100%" stopColor="#03fca9" />
                </linearGradient>
            </defs>
        </svg>
    );
}