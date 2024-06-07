import { useParams } from "react-router-dom";


const Blog = () => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:py-24">
    <div className="space-y-4 not-prose">
      <img
        alt="Blog post cover image"
        className="aspect-[2/1] overflow-hidden rounded-lg object-cover"
        height={600}
        src="/placeholder.svg"
        width={1200}
      />
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">The Joke Tax Chronicles</h1>
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <div>
            <span className="font-medium">John Doe</span>, Author{"\n                    "}
          </div>
          <div>•</div>
          <div>Published on May 14, 2024</div>
        </div>
      </div>
    </div>
    <div className="prose prose-gray mx-auto mt-8 dark:prose-invert">
      <p>
        Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One
        day, his advisors came to him with a problem: the kingdom was running out of money.
      </p>
      <p>
        Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under
        the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop
        Jokester.
      </p>
      <p>
        And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that
        they couldn't help but laugh. And once they started laughing, they couldn't stop.
      </p>
      <blockquote>
        “After all,” he said, “everyone enjoys a good joke, so it's only fair that they should pay for the privilege.”
      </blockquote>
      <h2>The Joke Tax</h2>
      <p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
      <ul>
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </ul>
      <p>
        As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who
        refused to let the king's foolishness get him down: a court jester named Jokester.
      </p>
    </div>
  </article>
  )
}

export default Blog;

/*
  Single blog page
  New Blog page
  Update Blog page
  Blog card
*/