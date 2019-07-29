import * as React from "react";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import { Consumer as ModalConsumer } from "../../services/modal/context";
import { Consumer as BrandConsumer } from "../../services/brand/context";
import { Consumer as AuthConsumer } from "../../services/auth/context";
import * as MODALS from "../../consts/modals";
import ValueBind from "../ValueBind";
import CloseByKey from "../CloseByKey";
import Container from "./components/Container";
import MyBooking from "./components/MyBooking";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";

type Props = {
  portal: string,
};

const ModalsAuth = ({ portal }: Props) => (
  <ModalConsumer>
    {({ value, onChange }) =>
      value !== MODALS.NONE && (
        <AuthConsumer>
          {auth => (
            <ValueBind value={MODALS.NONE} onChange={onChange}>
              {({ onClick }) => (
                <CloseByKey onClose={onClick}>
                  <Portal element={portal}>
                    <Modal onClose={onClick}>
                      <ModalSection>
                        {value === MODALS.MY_BOOKING && (
                          <Container value={value} onChange={onChange}>
                            <MyBooking
                              loading={auth.loading}
                              onMyBooking={auth.onMyBooking}
                              onChange={onChange}
                            />
                          </Container>
                        )}

                        {value === MODALS.REGISTER && (
                          <Container value={value} onChange={onChange}>
                            <Register
                              loading={auth.loading}
                              onRegister={auth.onRegister}
                              onChange={onChange}
                            />
                          </Container>
                        )}

                        {value === MODALS.SIGN_IN && (
                          <Container value={value} onChange={onChange}>
                            <SignIn
                              loading={auth.loading}
                              onSignIn={auth.onSignIn}
                              onChange={onChange}
                            />
                          </Container>
                        )}

                        {value === MODALS.FORGOT_PASSWORD && (
                          <BrandConsumer>
                            {brand => <ForgotPassword brandId={brand.id} onClose={onClick} />}
                          </BrandConsumer>
                        )}
                      </ModalSection>
                    </Modal>
                  </Portal>
                </CloseByKey>
              )}
            </ValueBind>
          )}
        </AuthConsumer>
      )
    }
  </ModalConsumer>
);

export default ModalsAuth;
