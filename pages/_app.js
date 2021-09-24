import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // useEffect(()=>{
  //   console.log('PAGE -QUERY')
  //   // router.query.code='updated-from-code';
  //   console.log('ROUTER ----', router)
  //   // router.replace({pathname:router.basePath, query:{code2test:'ali-here'} })
  // },[])

  useEffect(() => {
    console.log('PAGE LOADED ')

    // router.beforePopState((props)=>{
    //   console.log('beforePopState Props ---- ', props)
    //   // return props.url? true : false 

    //   // console.log('AS PATH ', router.asPath)

    //   // if(router.asPath === props.url) {

    //   //   console.log('INSIDE GO BACK')
    //   //   router.back(2)
    //   // }
      
    //   return true
    // })


    const handleRouteChange = (url) => {

      console.log('all args', url)

      console.log('ROUTER QUERY', router.query)

      if(!router.query.code2test){
        router.replace({pathname:router.basePath, query:{code2test:'ali-here'} })
      }

      // console.log('ROUTER -----', router)

      // const pathname= url.split("?")[0]
      // console.log('PATHNAME ----', pathname)
      // router.replace({pathname}, undefined, {shallow: true})

      // router.push()
      // if()
      // console.log('URL -----PROPSSS--- ',url, props)

      // url="/test?tests=link-update"

      // router.pushState({pathname:"/test",query:{noman:'ceo'}}, undefined, { shallow: true }

      // if(args[0]=== "/")
      // window.history.pushState({}, null, args[0]+'?test=testQueryString'+'&fbclid=some-fbclid');
     
      // else
      // window.history.pushState({}, null,'?test=testQueryString'+'&fbclid=some-fbclid');

      // router.push(url,undefined,{
      //   shallow:true
      // })
      
      // router.replace(url)
      // return url
      // router.push('/test?test=ali-here-works')
      // console.log(
      //   `App is changing to ${url}
      //     `

      // )
    }

    // router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('routeChangeStart', handleRouteChange)
    

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      // router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}