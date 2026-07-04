import styles from './networkBackground.module.css';

const NetworkBackground = ({ isHyperdrive }) => {
  return (
    <div className={styles.container}>
      <svg
        className={styles.svgMesh}
        style={{ animationDuration: isHyperdrive ? '2s' : '40s' }}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1">
          {/* Perimeter connections */}
          <line x1="100" y1="150" x2="350" y2="50" />
          <line x1="350" y1="50" x2="750" y2="100" />
          <line x1="750" y1="100" x2="900" y2="450" />
          <line x1="900" y1="450" x2="700" y2="850" />
          <line x1="700" y1="850" x2="400" y2="950" />
          <line x1="400" y1="950" x2="100" y2="700" />
          <line x1="100" y1="700" x2="100" y2="150" />

          {/* Internal web connections */}
          <line x1="100" y1="150" x2="300" y2="400" />
          <line x1="350" y1="50" x2="300" y2="400" />
          <line x1="650" y1="350" x2="350" y2="50" />
          <line x1="650" y1="350" x2="750" y2="100" />
          <line x1="650" y1="350" x2="900" y2="450" />
          <line x1="650" y1="350" x2="500" y2="650" />
          <line x1="700" y1="850" x2="500" y2="650" />
          <line x1="400" y1="950" x2="500" y2="650" />
          <line x1="250" y1="750" x2="400" y2="950" />
          <line x1="250" y1="750" x2="100" y2="700" />
          <line x1="250" y1="750" x2="300" y2="400" />
          <line x1="500" y1="650" x2="300" y2="400" />
          <line x1="650" y1="350" x2="300" y2="400" />
          <line x1="250" y1="750" x2="500" y2="650" />
        </g>

        {/* Nodes */}
        {/* White dots */}
        <circle cx="100" cy="150" r="5" fill="#ffffff" opacity="0.6" />
        <circle cx="900" cy="450" r="5" fill="#ffffff" opacity="0.4" />
        <circle cx="100" cy="700" r="6" fill="#ffffff" opacity="0.5" />
        <circle cx="650" cy="350" r="7" fill="#ffffff" opacity="0.7" />
        <circle cx="250" cy="750" r="4" fill="#ffffff" opacity="0.5" />

        {/* Grey dots */}
        <circle cx="350" cy="50" r="7" fill="#aaaaaa" opacity="0.8" />
        <circle cx="700" cy="850" r="6" fill="#aaaaaa" opacity="0.6" />
        <circle cx="500" cy="650" r="8" fill="#aaaaaa" opacity="0.5" />

        {/* Amber dots */}
        <circle cx="750" cy="100" r="5" fill="#f59e0b" opacity="0.9" />
        <circle cx="400" cy="950" r="6" fill="#f59e0b" opacity="0.8" />
        <circle cx="300" cy="400" r="7" fill="#f59e0b" opacity="1" />
      </svg>
    </div>
  );
};

export default NetworkBackground;
