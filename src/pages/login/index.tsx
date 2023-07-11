import styled, { keyframes } from 'styled-components'
import { Flex, Text } from 'rebass'

import useParsedQueryString from '../../hooks/useParsedQueryString'
const loadingAnimation = keyframes`
  0% {
      transform: rotate(0deg);
    }
  100% {
    transform:  rotate(360deg);
  }
`

// const Loading = styled(Loader)`
//   animation: ${loadingAnimation} 2s linear infinite;
// `;
export default function Login({ onClickLogin, loading }: { onClickLogin: () => void; loading: boolean }) {
  const { error_description } = useParsedQueryString()
  return (
    <LoginContainer>
      {/* <Image src={Logo} width="360px" height="119.25px" /> */}
      <Flex alignItems={'center'} flexDirection="column">
        {error_description && (
          <>
            <div>{error_description + ''}</div> <br />
          </>
        )}

        <button onClick={onClickLogin}>
          {loading ? (
            <>
              <Text>Loading...</Text>
              <Text fontSize="14px" fontWeight={500}>
                Checking data ...
              </Text>
            </>
          ) : (
            <>
              {/* <Google size={20} color="#FFFFFF" /> */}
              <Text fontSize="14px" fontWeight={500}>
                Sign in with Google
              </Text>
            </>
          )}
        </button>
      </Flex>
    </LoginContainer>
  )
}

const LoginContainer = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  height: 100%;
  min-height: 100vh;
`
