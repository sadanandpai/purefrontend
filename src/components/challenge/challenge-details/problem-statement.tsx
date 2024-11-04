import Image from "next/image";

interface Props {
  name: string;
  statement: string;
  difficulty: string;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
}

export function ProblemStatement({
  name,
  difficulty,
  statement,
  description,
  examples,
}: Props) {
  return (
    <>
      <h2>{name}</h2>
      <div className="my-4">
        <span>{difficulty}</span>
        <Image src="/js.svg" height={24} width={24} alt="JavaScript" />
      </div>
      <p dangerouslySetInnerHTML={{ __html: statement }}></p>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
      <div>
        {examples.map((example, idx) => (
          <div key={idx}>
            <p>
              <b>Example {idx + 1}</b>
            </p>

            <pre className="bg-gray-200 rounded-md p-4 mt-2 text-md">
              <span>Input: {example.input}</span>
              <br />
              <span>Output: {example.output}</span>
            </pre>
          </div>
        ))}
      </div>
    </>
  );
}
