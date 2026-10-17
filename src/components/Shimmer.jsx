// Pehle Fakeui.jsx aur ShimmerMenu.jsx dono same the -> ab ek hi
const Shimmer = ({ count = 12 }) => (
  <div className="shimmer-container">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="shimmer-card"></div>
    ))}
  </div>
);

export default Shimmer;
