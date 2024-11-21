import { Flex, Select, Text } from "@radix-ui/themes";

interface Props {
  fontSize: number;
  setFontSize: (size: number) => void;
}

export function EditorControls({ fontSize, setFontSize }: Props) {
  return (
    <>
      <Flex align="center" gap="1" className="shadow-md mb-2 p-2">
        <Text size="1">Font size</Text>
        <Select.Root
          size="1"
          value={String(fontSize)}
          onValueChange={(value) => setFontSize(Number(value))}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Font Size</Select.Label>
              <Select.Item value="12">Small</Select.Item>
              <Select.Item value="14">Medium</Select.Item>
              <Select.Item value="16">Big</Select.Item>
              <Select.Item value="18">Huge</Select.Item>
              <Select.Item value="20">Giant</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </>
  );
}
