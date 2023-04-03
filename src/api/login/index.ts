import request from '@/utils/request';
import type { verifyType, PhoneType } from './type'

/**
 * 手机登录
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
 * 获取验证码
 * @param { String } phone 用户手机号码
 * @returns Promise
 */
export const sentCaptchaApi = (phone: string) => {
  return request.get('/captcha/sent', { 
    params: { phone }
  })
}

/**
 * 验证 验证码
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
 * 生成一个二维码的key
 * @returns Promise
 */
export const loginQrKeyApi = () => {
  return request.get('/login/qr/key')
}

/**
 * 通过key生成二维码
 * @param { String } key key
 * @returns Promise
 */
export const createQrApi = (key: string, qrimg: boolean = true) => {
  return request.get('/login/qr/create', {
    params: { key, qrimg }
  })
}