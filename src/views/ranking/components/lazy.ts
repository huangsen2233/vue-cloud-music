import type { DirectiveBinding } from 'vue';

export const vLazy = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 图片进入视口，加载图片
          el.src = binding.value;
          // 加载完成后，取消观察
          observer.unobserve(el);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // 元素和视口有10%的交叉时触发回调函数
    });

    observer.observe(el);
  }
}
