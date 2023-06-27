import getIdCardInfo from "get-id-card-info";

// 根据身份证前六位返回所在地区
export function getAreaByIdCard (idCard: number) {
  const { addr: { province, city } } = getIdCardInfo(String(idCard));
  return `${province} - ${city}`
}

