export function rtfToText(rtf: string): string {
    const rtfRegex = /\\([a-z]+)(-?\d+)? ?|[{}]|\\'([0-9a-fA-F]{2})|([^\\{}]+)/g;
    let match: RegExpExecArray | null;
    const output: string[] = [];
    const stack: number[] = [];
  
    while ((match = rtfRegex.exec(rtf)) !== null) {
      if (match[0] === "{") {
        // Push the current output length onto the stack
        stack.push(output.length);
      } else if (match[0] === "}") {
        // Remove the last stack entry
        stack.pop();
      } else if (match[0][0] === "\\") {
        if (match[1] === "par" || match[1] === "line") {
          output.push("\n");
        } else if (match[1] === "tab") {
          output.push("\t");
        } else if (match[1] === "uc" && match[2]) {
          // Unicode character count to skip
          rtfRegex.lastIndex += Number(match[2]);
        } else if (match[1] === "'" && match[3]) {
          // Hexadecimal encoded character
          output.push(String.fromCharCode(parseInt(match[3], 16)));
        }
      } else if (match[4]) {
        // Plain text
        output.push(match[4]);
      }
    }
  
    return output.join("");
  }
  