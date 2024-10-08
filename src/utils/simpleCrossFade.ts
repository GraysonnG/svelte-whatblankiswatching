import { quintOut } from "svelte/easing";
import { crossfade } from "svelte/transition";

export const simpleCrossFade = crossfade({
  fallback: (node, _) => {
    const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 300,
      easing: quintOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t};
      `
    }
  }
})