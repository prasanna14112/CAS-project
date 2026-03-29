export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","), // header row
    ...data.map(row =>
      headers.map(h => JSON.stringify(row[h] ?? "")).join(",")
    )
  ];

  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv"
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  a.click();
  window.URL.revokeObjectURL(url);
};
