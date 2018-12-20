// Elements of this service-class are copied directly from https://gist.github.com/greatb/c791796c0eba0916e34c536ab65802f8

export class CookieService {

  public static getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < ca.length; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public static setCookie(name: string, value: string, expireDays: number, path: string = "") {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }

}
