import React, { useEffect, useState } from "react";

const GithubRepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = "aqshal1311"; // ganti dengan username kamu

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );

        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetch repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white py-10">
        Loading repositories...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white mt-10">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-500/40 transition"
        >
          <h2 className="text-xl font-bold mb-1">{repo.name}</h2>

          <p className="text-gray-400 text-sm mb-3">
            {repo.description || "No description"}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <span>⭐ {repo.stargazers_count}</span>
            <span>{repo.language || "Unknown"}</span>
            <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>

          <a
            href={repo.html_url}
            target="_blank"
            className="mt-4 inline-block text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      ))}
    </div>
  );
};

export default GithubRepoList;
