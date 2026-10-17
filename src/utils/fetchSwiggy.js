// Swiggy browser se direct call karne par CORS block karta hai,
// isliye frontend se CORS-proxy ke through bulate hain.
// Ek proxy fail ho jaye to agla try hota hai.
const PROXIES = [
  (url) => `https://proxy.corsfix.com/?${url}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

export const fetchSwiggy = async (url) => {
  let lastError = new Error("Koi proxy kaam nahi kar rahi");

  for (const makeUrl of PROXIES) {
    try {
      const res = await fetch(makeUrl(url));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Kabhi kabhi proxy HTML error page bhej deti hai, isliye text -> JSON
      const text = await res.text();
      return JSON.parse(text);
    } catch (err) {
      console.warn("Proxy fail:", err.message);
      lastError = err;
    }
  }
  throw lastError;
};
