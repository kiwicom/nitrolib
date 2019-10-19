// @flow strict

const errors = {
  requiredField: __("forms.errors.is_required"),
  accountExists: __("account.login_already_exists"),
  weakPassword: __("account.password_too_simple"),
  invalidEmail: __("account.wrong_format_email"),
  loginFailed: __("account.login_failed"),
  passwordMismatch: __("account.password_confirm_not_matching"),
  wrongIATACode: __("forms.enter_iata_code"),
  incorrectBidIATAInput: __("account.my_booking_login_incorrect"),
  invalidDate: __("forms.errors.invalid_date"),
  general: __("common.api_error"),
};

export default errors;
