
		export function capFirst(input) {
        let output = '';
        for (let i = 0; i < input.length; i++) {
          if (i === 0) {
            output = input.charAt(0).toUpperCase() + input.slice(i + 1);
          }
          if ((i + 1) <= input.length && input.charAt(i) === ' ') {
           output = output.substring(0, i + 1) + input.charAt(i + 1).toUpperCase() + input.slice(i + 2);
          }
        }
        return output;
		}
