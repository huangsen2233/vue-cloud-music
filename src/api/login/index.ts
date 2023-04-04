import request from '@/utils/request';
import type { verifyType, PhoneType } from './type'

/**
 * @description 手机登录
 * @param { String } phone 手机号码
 * @param { String } password 密码
 * @returns Promise
 */
export const loginPhoneApi = ({ phone, password, captcha }: PhoneType) => {
  return request.get('/login/cellphone', { 
    params: { phone, password, captcha }
  })
}

/**
 * @description 获取验证码
 * @param { String } phone 用户手机号码
 * @returns Promise
 */
export const sentCaptchaApi = (phone: string) => {
  return request.get('/captcha/sent', { 
    params: { phone }
  })
}

/**
 * @description 验证 验证码
 * @param { String } phone 用户手机号码
 * @param { String } captcha 验证码
 * @returns Promise
 */
export const verifyCaptchaApi = ({ phone, captcha }: verifyType) => {
  return request.get('/captcha/verify', { 
    params: { phone, captcha } 
  })
}

/**
 * @description 生成一个二维码的key
 * @returns Promise
 */
export const loginQrKeyApi = () => {
  return request.get('/login/qr/key')
}

/**
 * @description 通过key生成二维码
 * @param { String } key
 * @returns Promise
 */
export const createQrApi = (key: string, qrimg: boolean = true) => {
  return request.get('/login/qr/create', {
    params: { key, qrimg }
  })
}

/**
 * @description 获取二维码扫码的状态
 * 800为二维码过期, 801 等待扫码, 802为待确认, 803为授权登录成功并会返回 cookies
 * @param { String } key
 * @returns Promise
 */
export const checkQrApi = (key: string) => {
  return request.get('/login/qr/check', {
    params: { key }
  })
}

/**
 * @description 登录的状态
 * @returns Promise
 */
export const loginStatusApi = () => {
  return request.get('/login/status')
}

/**
 * @description 退出登录
 * @returns Promise
 */
export const logoutApi = () => {
  return request.get('/logout')
}


