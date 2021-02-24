const callbacks = new Map<HTMLElement, Function>();

export const observer = new IntersectionObserver((elements) => {
  elements.forEach((element) => {
    for (let [elem, callback] of callbacks.entries()) {
      if (elem === element.target) {
        callback(element);
      }
    }
  });
});

export const addObserver = (element, callback) => {
  observer.observe(element);
  callbacks.set(element, callback);
};

export const removeObserver = (element) => {
  observer.unobserve(element);
  callbacks.delete(element);
};
