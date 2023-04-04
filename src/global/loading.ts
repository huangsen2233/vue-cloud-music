type loadingType = {
  text?: string
  background?: string
}

let loadingInstance: any = null;

export function startLoading ({ text = '加载中......', background = 'rgba(0, 0, 0, 0.5)' }: loadingType) {
  loadingInstance = ElLoading.service({
    text,
    background,
    lock: true
    // spinner: 'el-icon-loading',
  });
}

export function endLoading () {
  loadingInstance.close();
}

