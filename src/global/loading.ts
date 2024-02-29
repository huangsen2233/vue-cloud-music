type loadingType = {
  text?: string
  background?: string
}

let loadingInstance: any = null;

export function startLoading ({ text = 'Loading......', background = 'rgba(255, 255, 255, 0.9)' }: loadingType) {
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

