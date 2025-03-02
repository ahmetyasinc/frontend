
export const metadata = {
    title: "Admin Sayfası",
    description: "Admin sayfası.",
  };

  export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 saniyelik gecikme
    return <h1 className="text-2xl">Admin sayfası</h1>;
}
