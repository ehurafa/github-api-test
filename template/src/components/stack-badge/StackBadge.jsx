import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Skeleton } from "./Skeleton";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = `https://api.github.com/users/ehurafa/repos?per_page=100`;

export default function StackBadge() {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    async function fetchLanguages() {
      const res = await fetch(API_URL);
      const repos = await res.json();

      const langCount = {};

      for (const repo of repos) {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      }

      const total = Object.values(langCount).reduce((a, b) => a + b, 0);
      const sorted = Object.entries(langCount)
        .map(([lang, count]) => ({
          language: lang,
          count,
          percentage: ((count / total) * 100).toFixed(1),
        }))
        .sort((a, b) => b.count - a.count);

      setLanguages(sorted);
    }

    fetchLanguages();
  }, []);

  if (!languages) {
    return <Skeleton className="h-32 w-full rounded-xl" />;
  }

  return (
    <Card className="p-4 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">🧑‍🎓 Stack Atual</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {languages.map((lang) => (
          <Badge key={lang.language} variant="secondary">
            {lang.language}: {lang.percentage}%
          </Badge>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={languages} layout="vertical">
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="language" width={80} />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}