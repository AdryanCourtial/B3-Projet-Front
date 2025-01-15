import ContentA from "./ContentA/ContentA";
import ContentB from "./ContentB/ContentB";

export default function Home() {

    return (
        <div className="px-4 py-14 m-auto max-w-[1200px] [&>div]:my-12">
            <ContentA />
            <ContentB />
        </div>
    )
  }
  