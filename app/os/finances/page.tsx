"use client";

import { Card, PageHead, Stat } from "@/components/ui";
import { gbp, shortDate, useOS } from "@/lib/store";

export default function Finances() {
  const os = useOS();
  const income = os.txns.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spend = os.txns.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);
  const byCat = Object.entries(
    os.txns.filter((t) => t.amount > 0).reduce<Record<string, number>>((m, t) => ({ ...m, [t.category]: (m[t.category] ?? 0) + t.amount }), {}),
  ).sort((a, b) => b[1] - a[1]);
  const top = byCat[0]?.[1] ?? 1;

  return (
    <>
      <PageHead kicker="Money" title="Money in and out" lede="Income and costs across services, products and publishing." aside={<span className="demo-banner">Sample figures</span>} />
      <div className="grid g-3" style={{ marginBottom: 18 }}>
        <Stat label="Income" value={gbp(income)} />
        <Stat label="Costs" value={gbp(spend)} />
        <Stat label="Net" value={gbp(income - spend)} />
      </div>
      <div className="grid g-3" style={{ alignItems: "start" }}>
        <Card title="Transactions" className="span-2">
          <table className="table">
            <thead><tr><th>Date</th><th>Item</th><th>Category</th><th className="r">Amount</th></tr></thead>
            <tbody>
              {os.txns.map((t) => (
                <tr key={t.id}>
                  <td className="mono muted">{shortDate(t.date)}</td>
                  <td>{t.label}</td>
                  <td><span className="tag">{t.category}</span></td>
                  <td className="r mono" style={{ color: t.amount > 0 ? "var(--signal)" : "var(--paper-dim)" }}>{t.amount > 0 ? "+" : "−"}{gbp(Math.abs(t.amount))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title="Income by stream">
          <ul className="list">
            {byCat.map(([cat, v]) => (
              <li key={cat} className="stack" style={{ gap: 6 }}>
                <div className="row between"><span>{cat}</span><span className="mono">{gbp(v)}</span></div>
                <div className="bar"><span style={{ width: `${Math.round((v / top) * 100)}%` }} /></div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
