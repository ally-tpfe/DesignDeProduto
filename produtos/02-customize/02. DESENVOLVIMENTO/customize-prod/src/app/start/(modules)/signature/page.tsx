'use client'
/* eslint-disable no-use-before-define */
import SignatureForm from '@/components/signature/Form'
import Image from 'next/image'
import React, { useEffect } from 'react'

import singarutreSideA from '@/assets/sideA.svg'
import singarutreSideB from '@/assets/sideB.svg'
import Signature from '@/components/signature/Signature'
import { motion, useAnimation } from 'framer-motion'
import { ArrowLeft, Share } from '@phosphor-icons/react'
import { useBackground } from '@/contexts/BackgroundContext'

import OutlookLogo from '@/assets/artefacts/outlook.svg'
import Tutorial from '@/assets/tutorial.gif'
import X from '@/assets/artefacts/XButton.svg'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/contexts/UserContext'
import { useMsal } from '@azure/msal-react'
import { uploadUserPhotoToS3 } from '@/utils/getPhoto'
import { msalConfig } from '@/services/msal'

export default function StartApp() {
  const { setBackgroundState } = useBackground()
  const router = useRouter()
  const { user, addUser } = useUserContext()
  const { instance, accounts } = useMsal()

  // animation constrols
  const controls = useAnimation()
  const signatureControl = useAnimation()
  const signature = useAnimation()
  const buttonsControl = useAnimation()
  const titleControl = useAnimation()
  const AnimateOutlookLogo = useAnimation()
  const successMessage = useAnimation()

  const uploadPhoto = async () => {
    await uploadUserPhotoToS3(user.accessToken as string).then((photo) => {
      addUser({
        ...user,
        userPhoto: photo as string,
      })
    })
  }

  useEffect(() => {
    const request = {
      scopes: ['User.ReadBasic.All'],
      account: accounts[0],
    }
    const handleLogin = async () => {
      instance
        .initialize()
        .catch((e) => {
          console.log(e)
        })
        .then(() => {
          instance
            .loginRedirect(msalConfig.auth)
            .catch((e) => {
              console.log(e)
            })
            .finally(() => {
              instance.acquireTokenSilent(request).then((response) => {
                const accessToken = response.accessToken as string
                const photo = async () => await uploadUserPhotoToS3(accessToken)
                addUser({
                  firstName: accounts[0].name?.split(' ')[0] as string,
                  email: accounts[0]?.username as string,
                  fullName: accounts[0]?.name as string,
                  usePhoto: true,
                  userPhoto: '',
                  accessToken,
                  personalPhone: '',
                  workPhone: '',
                  workPhoneExtension: '',
                })
              })
              console.log(user)
              router.push('/start/signature')
            })
        })
    }

    if (accounts[0]) {
      const getAndSetUserPhoto = async () => {
        await instance.initialize().catch((e) => {
          console.log(e)
        })
        instance.acquireTokenSilent(request).then((response) => {
          uploadUserPhotoToS3(response.accessToken).then((photo) => {
            addUser({
              ...user,
              usePhoto: true,
              userPhoto: photo as string,
              accessToken: response.accessToken as string,
            })
          })
        })
      }
      getAndSetUserPhoto()
    } else {
      router.push('/')
    }
    const handleClick = async () => {
      await animateElements()
    }

    const handleClickReverse = async () => {
      await reverseAnimateElements()
    }

    const handleClickFinish = async () => {
      await sendSignature()
    }

    const animateElements = async () => {
      await controls.start({
        opacity: 0,
        translateX: '-10%',
        translateY: '-200%',
        transition: { duration: 0.5 },
      })
      await titleControl.start({
        opacity: 1,
        transition: { duration: 0.5 },
      })
      await signatureControl
        .start({
          opacity: 1,
          transition: { duration: 0.2 },
        })
        .then(() => {
          signatureControl
            .start({
              translateX: '-12%',
              translateY: '-80%',
              scale: 1.2,
              transition: { duration: 0.5 },
            })
            .then(() => {
              signatureControl.start({
                opacity: 1,
                transition: { duration: 0.2 },
              })
            })
        })
      await signature
        .start({
          opacity: 0,
          transition: { duration: 0.01 },
        })
        .then(() => {
          signature
            .start({
              translateX: '-25%',
              translateY: '-60%',
              scale: 1.1,
              transition: { duration: 0.4 },
            })
            .then(() => {
              signature.start({
                opacity: 1,
                transition: { duration: 0.5 },
              })
            })
        })
      await buttonsControl.start({
        opacity: 1,
        transition: { duration: 1.3 },
      })
    }

    const reverseAnimateElements = async () => {
      await buttonsControl.start({
        opacity: 0,
        transition: { duration: 0.1 },
      })
      await titleControl.start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
      await signature
        .start({
          opacity: 1,
          transition: { duration: 0.2 },
        })
        .then(() => {
          signature
            .start({
              translateX: '-25%',
              translateY: '-58%',
              scale: 1.1,
              transition: { duration: 0.2 },
            })
            .then(() => {
              signature.start({
                opacity: 1,
                transition: { duration: 0.2 },
              })
            })
        })
      await signatureControl
        .start({
          opacity: 1,
          transition: { duration: 0.2 },
        })
        .then(() => {
          signatureControl
            .start({
              translateX: '0%',
              translateY: '0%',
              scale: 1,
              transition: { duration: 0.2 },
            })
            .then(() => {
              signatureControl.start({
                opacity: 1,
                transition: { duration: 0.2 },
              })
            })
        })
      await controls.start({
        opacity: 1,
        translateX: '0%',
        translateY: '0%',
        transition: { duration: 0.5 },
      })
    }

    const sendSignature = async () => {
      await titleControl.start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
      await AnimateOutlookLogo.start({
        opacity: 1,
        transition: { duration: 0.1 },
      }).then(() => {
        AnimateOutlookLogo.start({
          translateY: '650%',
          scale: 1.3,
          transition: { duration: 0.5 },
        })
        signatureControl
          .start({
            scale: 0.2,
            translateX: '-53%',
            translateY: '-85%',
            transition: { duration: 0.2 },
          })
          .then(() => {
            buttonsControl.start({
              opacity: 0,
              transition: { duration: 0.5 },
            })
            AnimateOutlookLogo.start({
              scale: 1.5,
              transition: { duration: 0.2 },
            })
            signatureControl
              .start({
                translateX: '-15%',
                opacity: 0,
                transition: { duration: 1 },
              })
              .then(() => {
                AnimateOutlookLogo.start({
                  scale: 1.1,
                  translateY: '365%',
                  zIndex: 9999,
                })
              })
              .then(() => {
                successMessage.start({
                  zIndex: 9888,
                  opacity: 1,
                  transition: { duration: 2.5 },
                })
              })
          })
      })
    }

    const sidebarElement = document.getElementById('sidebar')
    const formElement = document.getElementById('form')
    const trigger = document.getElementById('concluir')

    const buttons = document.getElementById('buttons')
    const reverseTrigger = document.getElementById('voltar')

    const finishButton = document.getElementById('enviar')

    if (sidebarElement && formElement && buttons) {
      trigger?.addEventListener('click', handleClick)
      reverseTrigger?.addEventListener('click', handleClickReverse)
      finishButton?.addEventListener('click', handleClickFinish)
    }

    return () => {
      if (sidebarElement && formElement) {
        sidebarElement.removeEventListener('click', handleClick)
        formElement.removeEventListener('click', handleClick)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSendUserData(data: {
    email: string
    name: string
    user_photo: string
    personal_phone: string
    work_phone: string
    apiKey?: string
    work_phone_extension: string
  }) {
    uploadPhoto()
    const userData = {
      email: data.email,
      name: data.name,
      user_photo: data.user_photo,
      personal_phone: data.personal_phone,
      work_phone: data.work_phone,
      work_phone_extension: data.work_phone_extension,
    }

    console.log(userData)

    fetch('https://customize.tpfe.com.br/api/addUser', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
        user_photo: userData.user_photo,
        personal_phone: userData.personal_phone,
        work_phone: userData.work_phone,
        work_phone_extension: userData.work_phone_extension,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.error('Error:', error)
    })
  }

  return (
    <motion.div
      className="flex h-full w-[100-20rem] flex-col gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={titleControl}
        className="h-18 fixed flex w-[42rem] items-center justify-center rounded-2xl bg-white bg-opacity-0 p-2 opacity-0 shadow-customize-title-card-shadow backdrop-blur-md 2xl:left-[30%] 2xl:top-[10%]"
      >
        <h1 className="text-[1.25rem] font-semibold text-white">
          Confira mais uma vez sua assinatura antes de anexá-la ao seu email
        </h1>
      </motion.div>
      <motion.div
        id="form"
        className="flex h-[19.31619rem] max-h-[20rem] min-h-[19rem] w-[57rem] flex-col items-start justify-center rounded-2xl bg-customize-signature-form-background shadow-customize-signature-form-shadow backdrop-blur-[20px]"
        animate={controls}
      >
        <SignatureForm />
      </motion.div>
      <motion.div
        id="signature"
        className="flex h-full w-[57rem] items-center justify-center gap-6 "
        animate={signatureControl}
      >
        <div className="z-50 flex h-[calc(100%-2rem)] w-[46rem] items-center justify-between rounded-2xl bg-white">
          <Image
            src={singarutreSideA}
            alt=""
            className="mx-0 mr-auto h-full rounded-s-2xl bg-white object-fill p-0"
            height={215}
          />
          <div className="top-0 flex min-h-[15rem] max-w-[56rem] items-center justify-evenly gap-2 rounded-2xl">
            <Signature />
          </div>
          <Image
            src={singarutreSideB}
            alt=""
            height={215}
            className="mx-0 ml-auto h-full rounded-e-2xl bg-white object-fill p-0"
          />
        </div>
      </motion.div>
      <div
        id="buttons"
        className="fixed left-[50%] top-[70%] flex translate-x-[-55%] translate-y-[-40%] transform gap-12"
      >
        <motion.button
          id="voltar"
          className="flex h-8 w-28 items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-3 py-1 font-bold text-zinc-50 opacity-0 hover:opacity-90"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setBackgroundState('static')
          }}
          animate={buttonsControl}
        >
          <ArrowLeft weight="bold" />
          Voltar
        </motion.button>
        <motion.button
          id="enviar"
          className="flex h-8 w-28  items-center justify-center gap-2 rounded-lg bg-[#0067FF] px-3 py-1 font-bold text-zinc-50 opacity-0 hover:opacity-90"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            handleSendUserData({
              email: user.email,
              name: user.fullName,
              user_photo: user.usePhoto ? user.userPhoto : '',
              personal_phone: user.personalPhone,
              work_phone: user.workPhone,
              work_phone_extension: user.workPhoneExtension,
            })
            setBackgroundState('loading')
          }}
          animate={buttonsControl}
        >
          <Share weight="bold" />
          Enviar
        </motion.button>
      </div>
      <motion.div
        animate={AnimateOutlookLogo}
        className="opacity-1 fixed -top-[20rem] left-[45%] flex translate-x-[-50%] flex-col items-center justify-center gap-4 transition-all"
      >
        <Image src={OutlookLogo} alt="" className="z-[9999px]" />
      </motion.div>
      <motion.div
        animate={successMessage}
        className="fixed left-1/2 top-1/2 -z-50  flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-4 opacity-0 transition-all max-[1560px]:top-3/4 max-[1560px]:h-[35rem] max-[1560px]:w-[35rem] max-[1560px]:translate-y-[-70%]"
      >
        <div className="flex h-[25rem] w-[58rem] justify-center rounded-2xl bg-customize-signature-form-background p-3  px-8 py-8 text-center text-white shadow-customize-card-finish-shadow backdrop-blur-[20px]  lg:h-[35rem] lg:w-[58rem]">
          <Image
            src={Tutorial}
            alt=""
            className="h-[500px] w-[620px] rounded-2xl max-[1560px]:h-[450px] max-[1560px]:w-[640px]"
          />
          <div className="flex h-full flex-col items-start justify-start gap-4 px-10">
            <h1 className="font-sans text-3xl font-bold text-white">
              Tudo certo! ❤️
            </h1>
            <h1 className="text-left text-lg">
              Acesse o <b>outlook</b> e siga <b>todos esses passos</b> para
              habilitar corretamente sua assinatura. Feche este tutorial{' '}
              <b>somente após concluir o processo.</b>
            </h1>
          </div>
        </div>
        <button
          title="Fechar aviso"
          type="button"
          onClick={() => window.location.reload()}
          id="afterFinishButton"
          className="relative bottom-0 left-0 right-0 top-0 m-auto flex flex-col items-center gap-4"
        >
          <Image src={X} alt="" />
        </button>
      </motion.div>
    </motion.div>
  )
}
