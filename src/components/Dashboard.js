export default function Dashboard({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4 text-white">

      <div className="bg-gray-800 p-4 rounded-xl">
        <h2>🎯 Opportunities</h2>
        {data.opportunities.map((o, i) => (
          <p key={i}>{o.title} - {o.score}%</p>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h2>📚 Courses</h2>
        {data.courses.map((c, i) => (
          <p key={i}>{c.name} - {c.score}%</p>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h2>👨‍🏫 Mentors</h2>
        {data.mentors.map((m, i) => (
          <p key={i}>{m.name}</p>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl col-span-3">
        <h2>🏆 Level: {data.level}</h2>
        <div className="bg-gray-600 h-4 rounded">
          <div className="bg-green-400 h-4 rounded" style={{ width: `${data.xp}%` }}></div>
        </div>
      </div>

    </div>
  );
}
