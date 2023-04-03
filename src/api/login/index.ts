import request from '@/utils/request';
import type { verifyType, PhoneType } from './type'

/**
 * 手机登录
 * @param { String } phone 手机号码
 * @param { String } password 密码
 * @returns Promise
 */
export const loginPhoneApi = ({ phone, password }: PhoneType) => {
  return request.get('/login/cellphone', { 
    params: { phone, password }
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