import FaLocale from 'element-ui/lib/locale/lang/fa'
export const messages = {
  fa: {
    ...FaLocale,

    //login and register forms
    signup: 'ثبت نام',
    login: 'ورود',
    username: 'نام کاربری',
    password: 'رمز عبور',
    email: 'ایمیل',
    confirm: 'ثبت',


    //login and register forms errors
    blank_username_error: 'نام کاربری خود را وارد کنید',
    not_unique_username_error: 'عضوی با این نام کاربری وجود دارد',
    wrong_password_error:'لطفا رمز عبور دیگری انتخاب کنید',
    blank_password_error: 'لطفا رمز عبور خود را وارد کنید',
    wrong_password_length_error: 'رمز عبور باید حداقل 8 کاراکتر داشته باشد',
    wrong_password_latin_error:'در رمز عبور باید از حروف و اعداد انگلیسی استفاده شود',
    wrong_password_all_char_error: 'رمز عبور حداقل یک حرف داشته باشد',
    wrong_password_all_number_error: 'رمز عبور باید حداقل یک عدد داشته باشد',
    blank_email_error: 'لطفا ایمیل خود را وارد کنید',
    invalid_email_error: 'لطفا ایمیل معتبر وارد کنید',
    not_unique_email_error: 'عضوی با این آدرس ایمیل وجود دارد',
    incorrect_pass_or_username_error: 'رمز عبور و یا نام کاربری اشتباه است',

    //top nav
    logout:'خروج',
    iot_platform: 'پلتفرم اینترنت اشیا',

    //account
    my_channels: 'کانال‌ها',
    new_channel: 'کانال جدید +',
    no_channel_error: 'کانالی موجود نیست',

    //channel form
    channel_name: 'نام کانال',
    field: 'فیلد',
    num_of_fields: 'تعداد فیلدها',
    fields:  'فیلدها',
    comma: '،',

    //channelform errors
    blank_field_error: 'لطفا نام فیلد را وارد کنید',
    blank_channel_name_error:  'نام کانال را وارد کنید',

    //view channel
    chart_view: 'نمایش نمودار',
    table_view:'نمایش جدولی',
    api_key: 'دریافت کلید API',
    generate_new_api_key: 'ساخت کلید API جدید',
    your_api_key: 'جدید API کلید',

    //table
    hour:'ساعت',
    date:'تاریخ',

    //chart
    show_chart_from : 'نمایش داده‌ها از تاریخ'
  }
}
