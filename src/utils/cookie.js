/*cookie操作方法
 *create by yk 2016/5/19
 */

export default {
  /**
   * 设置cookie
   *
   * @param {any} cname
   * @param {any} cvalue
   * @param {any} exHours
   */
  set (cname, cvalue, exHours) {
    let d = new Date();
    d.setTime(d.getTime() + (exHours * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  /**
   * 获取cookie
   *
   * @param {any} cname
   * @returns
   */
  get (cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  /**
   * 删除cookie
   *
   * @param {any} cname
   */
  clear(cname) {
    this.set(cname, "", -1);
  }
}
