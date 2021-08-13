import FaLocale from 'element-ui/lib/locale/lang/fa'
export const messages = {
  fa: {
    ...FaLocale,
    signup: 'ثبت نام',
    login: 'ورود',
    username: 'نام کاربری',
    password: 'رمز عبور',
    email: 'ایمیل',
    confirm: 'ثبت',


    //errors
    blank_username_error: 'نام کاربری خود را وارد کنید',
    wrong_password_error:'لطفا رمز عبور دیگری انتخاب کنید',
    blank_password_error: 'لطفا رمز عبور خود را وارد کنید',
    wrong_password_length_error: 'رمز عبور باید حداقل 8 کاراکتر داشته باشد',
    wrong_password_latin_error:'در رمز عبور باید از حروف و اعداد انگلیسی استفاده شود',
    wrong_password_all_char_error: 'رمز عبور حداقل یک حرف داشته باشد',
    wrong_password_all_number_error: 'رمز عبور باید حداقل یک عدد داشته باشد',
    blank_email_error: 'لطفا ایمیل خود را وارد کنید',
    invalid_email_error: 'لطفا ایمیل معتبر وارد کنید'
  }
}
