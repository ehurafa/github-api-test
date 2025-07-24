// Exemplo 1: Vitrine Interativa de Projetos
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GitHubRepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/ehurafa/repos?sort=updated`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
    })
      .then((res) => res.json())
      .then(setRepos);
  }, [username]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <div key={repo.id} className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-blue-600">{repo.name}</h2>
          <p className="text-gray-700 text-sm mb-2">{repo.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>🕒 {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-500 hover:underline"
          >
            Ver no GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

// Exemplo 2: Gráfico de Linguagens Usadas
const GitHubLanguagesChart = ({ username }) => {
  const [languageData, setLanguageData] = useState({});

  const selectedRepos = [
  "portfolio-mfe",
  "react-from-zero-to-mastery",
];

  useEffect(() => {
    const fetchLanguages = async () => {
      const languageTotals = {};

      for (const repoName of selectedRepos) {

      const res = await fetch(`https://api.github.com/repos/ehurafa/${repoName}/languages`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      });

      const langs = await res.json();

      for (const [lang, count] of Object.entries(langs)) {
        languageTotals[lang] = (languageTotals[lang] || 0) + count;
      }

      await new Promise((res) => setTimeout(res, 200)); //


      }


      setLanguageData(languageTotals);
    };

    fetchLanguages();
  }, [username]);

  const chartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Bytes de código",
        data: Object.values(languageData),
        backgroundColor: [
          "#4dc9f6",
          "#f67019",
          "#f53794",
          "#537bc4",
          "#acc236",
          "#166a8f",
          "#00a950",
          "#58595b",
          "#8549ba"
        ]
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Linguagens Mais Usadas
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export { GitHubRepoList, GitHubLanguagesChart };
