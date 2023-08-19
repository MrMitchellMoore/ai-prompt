import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col space-y-6">
      <h1 className="head_text text-center">Ai-Discovery Engine</h1>
      <p className="orange_gradient text-center text-2xl md:text-4xl">
        AI-Powered Prompts
      </p>
      <p>
        <span className="orange_gradient text-lg">Prompted-AI</span> is an
        open-source AI prompting tool for the modern world of discovery.
        <br /> <span className="blue_gradient">Create and Share</span> with the
        world!
      </p>
      <Feed />
    </section>
  );
}
