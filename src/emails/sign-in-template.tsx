import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SignInTemplateProps {
  name: string;
  otp: string;
}

const SignInTemplate = ({ name, otp }: SignInTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>验证您的邮箱 - QRManager</Preview>
      <Body className="bg-gray-100 font-sans text-gray-700">
        <Container className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-6">
          {/* Header with Logo */}
          <Section className="bg-gradient-to-r from-blue-600 to-blue-500 py-6 text-center">
            <Img
              src="https://image.dooo.ng/c/2025/06/30/6861f48915974.webp"
              width={150}
              height={150}
              alt="Logo"
              className="mx-auto mb-2"
            />
          </Section>

          {/* Message Body */}
          <Section className="px-6">
            <Text className="text-lg mb-4">
              您好，<strong>{name}</strong>！
            </Text>
            <Text className="mb-4 leading-relaxed">
              感谢您注册 <strong>QRManager</strong>
              。为了确保您的账户安全，请使用下方验证码完成邮箱验证。
            </Text>

            <Section className="text-center my-6">
              <Text className="text-2xl font-bold tracking-widest bg-blue-100 text-blue-700 py-3 px-8 rounded-full inline-block">
                {otp}
              </Text>
            </Section>

            <Text className="text-sm text-gray-600">
              此验证码将在 <strong>5 分钟</strong>{" "}
              内失效。若非您本人操作，请忽略此邮件。
            </Text>
          </Section>

          {/* Footer */}
          <Section className="bg-gray-50 border-t border-gray-200 p-4 text-center">
            <Text className="text-xs text-gray-500 mb-2">
              本邮件由系统自动发送，请勿直接回复。
            </Text>
            <Text className="text-xs text-gray-500">
              © 2025 QRManager. 保留所有权利。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default SignInTemplate;
