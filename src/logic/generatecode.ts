// Given a list of components, return a basic JSX code snippet
export const generateCodeSnippet = (components: string[]): string => {
  const snippetMap: Record<string, string> = {
    Input: `<Input id="inputId" placeholder="Enter text" />`,
    Label: `<Label htmlFor="inputId">Label</Label>`,
    Button: `<Button variant="primary">Submit</Button>`,
    Checkbox: `<Checkbox id="remember" label="Remember me" />`,
  };

  // Return only known components, otherwise flag unknowns
  return components
    .map((c) => snippetMap[c] || `<!-- Unknown: ${c} -->`)
    .join('\n');
};
