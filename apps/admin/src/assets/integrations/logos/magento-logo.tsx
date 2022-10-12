export const MagentoLogo = ({ ...props }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="7" y="5" width="33" height="38" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_1857_18223"
            xlinkHref="#image0_1857_18223"
            transform="translate(0 -0.0108359) scale(0.00392157 0.00340557)"
          />
        </pattern>
        <image
          id="image0_1857_18223"
          width="255"
          height="300"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAAEsCAYAAAAM1WX/AAAgAElEQVR4nO3deZhcVZk/8O85595be69kZ8nS3UFwZhwRFBeEcQECKEGbdBJ01HHDcXBUULKSkKSDoLiO47j9VIQkxAGEJOAyA+pPZDQ4Oo5oOs0SIOkspLda771nmT+qK1THJHSS7rpVdd/P84jP051Uvam637uce857GUjo7Ly0LTKtiX+CWewG46lbd2nn9rM3P+EFXRepLBZ0AaSyBt4x58poVKyNOtbZGV8jaXMUfPW/WV8tP2VT7w+Dro9UDoU/JPYtaJuTEGJd1GILDGPI+PrQ75I2B4yBq7FRarWs6a6dTwVYKqkQCn+de/hCWOdM6bjOttnSqC1ahz0FZUZ/8QaAYECDI5D31UFfmnUbd/Z85UOPww+qbjLxKPx1bKCr7UKLi+5kRJxfkBp5ZY75hRsAUcEQszgyrvqV9NWS5s29P6tUvaSyKPx1aO/8OZNjEb7KtsSHooLzIV8d92s02AIFpbSU+t8KObl6yv1P75uAUkmAKPx1Zqir7V2WEGvijjgj42v4+thH+6MxAGzGkIxw5Fy5S2q2vHHDju+Pd70kOBT+OtE/f87LrSj/TCpiz/O0QVbqcflyDYCExWEzhoyUWyXkkpY7n/rDOLw0CRiFv8Ztv2J6/GXJ5PWMsxtitkgOeQpmAt6HAWh0BPJSpZXGbYN+9rOnbX4+PwFvRSqEwl/D+he3X+4Y1p2IWH+V8zXcEzzFHysDIMIZ4jZH1pf/o6RZ2rhx59YJfEsygSj8Nai/c/bpls3XRIT1bsEZ0mX37CslZXMobeBK/d2MlCunb37q2YoXQU4Khb/GZBd2fMQItiphi0lpT0GaYL5EA8BiQMoRyHpqP9NmdWJDz1cDKIWcIAp/jei/es7rbEt0Jx3rgoJ66Xv2lWIAxARDVHBkpfqZK+XS1o1PPhp0XeSlVcP2Q45h16LTmyfBWW64uC5mcWvY0xMyoHeyigOCHFmpJVfqS/vycs2s+54ZDLoucnQU/iqWXtDRBcHWJSNi9sncs68UA8DmDEmbI+OrJyHNstTGnk1B10WOrJq3pdA6sGB2R1zY3VGbv0MZICsrP6B3shIWh2BAwdf/nvO9ZZM2P70j6JrIaBT+KvLHzrOcMyzvE4bzpUnHSg17Croaz/HHiI8sFsp6chiGdW/zxeevpr4BVYPCXyUOLpz1liiz1scj9jl5qVGokgG9k1W+WCjnyu1+QS5puuepnwZdF6HwB+7AVWdMi0ejN3PB3u9whuEA7tlXSoPN4SkDrfCNA27+ppn37OoLuqYwo/AHaHhhx/uFwOq4bU1PexrS1MfR/miKcwMYUg5H3pO7pcaqhg093wy6rrCq522tag0umnOODbE+7oi3uBrIjdMinFphAMQtjggHcr7+sS/VkqZNvb8Nuq6wCdM2F7gnO2c3TrX4p8HFJ+O2cCZqEU6tKC0WyknlGmM+v8+Tt8zZ/NRQ0HWFBYW/Qga6OuY7gq2LO+JlWV/Dq/J79pViADicIWFz5Dz9hKf9Zc0bnrwv6LrCgLa/CbZvQduclBA3OxZfZBhGNc4kox1qJKr0hqzUK6Zs6n0y6JrqGYV/gjx8IaxXTOm4LmKzpbGjNM4ko5U3Ei146gVPq3W/7ev9ykWPQAZdWz2ibXECpBe1XyDAb4lFxPn1dM++Ug4tFrI4cp561MvrJc337Px50HXVG9omx9G+hbOmRLm90mL8w7ETbJxJRmu0BfJKaSnVv+Zdc/PUe5/cH3RN9YLCP04yXW3vYkLcHHfEzFpYhFMrDi0Wcjjyrnzal1jVuKnne0HXVQ9o+zxJA4vaXyHAu5M2v9QfWYRDH+r4e7GRKJD2/Qe14kuaN/X8Pui6ahltpyfo92+dkpjdkrqeW+KGuCUSYb9nXylljUSzSqrb0tncbdMf2JMLuq5aROE/Admu9ssMZ+sr1TiTjHZ4I1GmsSRxV8+2oOuqNbTNHof+ztmnO7a9yrbYewULpnEmGS1lc0htIJX+jqvVytaNTz4XdE21gsI/RukFHR/lFlsRd8TkIBtnktHKG4nmPLkPGjdTI9Gxoe33JQx3tp3PbX5LwrEucJVGju7ZVyUDIC4YIiONRJVxb2y885nHgq6rmtF2fBS7Lju9ubXBWc6EuC5ucWvQo1P8WlBqJJqT2jdKfelAXq6lRqJHRuE/gqEFHV2WhTVxx2qje/a1p3xuQM6VvVJiReOmno1B11VtaJsu09fZdlbSFuviNr+yVhtnktESFgdnQN6T97oFb9kp9+76U9A1VQsKP4DtHzzHPjOdvt4wLE1GrCQtwqkf5YuFsp5MQ2P9n3tSn33V44/7QdcWtNBv3wfnt78lGuPr4xFxTk5quCEZ0OMMiAqOgtI13SF4rAyAiGCIWxw5V2/PF7wlp4S8kWgYtvMj2t85c2rKiqyCYB9yBMdwSBbhlKbJKm1QUHpHzOJzOWOhmpbcYAt4SkNDfz2j/JVTNjy9L+iagsCDLiAIw1d3fCARiTwejYoP+QYIw+q7UvPM5oiAVPqZgi+vaZa5v80W5Lul0ruaIwIWY6GYojzkK/gGiNvWB1Pc2T68sOP9QdcUhLDs7AEABxa0vTIu+C1hbJzZ6HDkfA0O8+Xdnl7Tvrn3QOl3fZ1tkxpsrAQTH43ZHEMhua05qpGop3/saXVj88be/w66rkoJxbZ/4G1zU5GUWSoY+3jcEpGwLMI59MAMwZHz5aM5Ty+dtLn3Z0f78we62i6MW3xd3LZeG6YmJKXFQlmpXC3V7XtyYv2Z9+9IB13XRKv70/6Brjnz4yn2WMqxbjRgkYEQBN+gOKDXHBHQSg9k8/KTt7X3vOFYwQeASRt7H3mP23NB2pPXa20GmiMCnCEUn9eApwCwSCrmLDktxR4bWDjnyqDrmmh1u2Pf/47Z7fGovTYi2NVgLFSNM4uNMAFX6k3ZnFo25b7jb4S5v3NOW8IW3Y4lOhGyxqOHGolKsynny+WTNz/ZG3RNE6Huwv/whbDOmdzxMcthS8LUOLO8BXbWU3/yjV7efNfOe072ddML29/BGFubiFhnhqXlePncgLyvDkrfdD+ke7549WbU1chwXX2P/V0db4hy9pmwNc4sXbNmpHSZ0rfn5FD35M0HMuP1+gfedkoqkWpZqhn7eCKMYyYWQ85Tj7oKN7Zs7PlF0HWNl7rIRl9n26S4wErLEtfGLCGGvLraQR9V+Wh11lM/kUrfOJGPvRpcNOccC/yWhGO9OXx3SwTyUisp5b/mFG6eVna3pFbV/Hc3tKDj3Y7FVkdD1Diz/IGXGVfu4QY3JSr4wMvs4o4PwGBVPBKOB4wCZYuFbI6cp56RSq1s3Nh7R9B1nYya/c4GFnT8jRB6fdK2Q9c4s8Hm8LSBlObfCm5h9aQAHnV9oOu06VEWWWVb1gfsOn+0eLnyRqIZT26TkEtaNjz9P0HXdSJqLi/PdZ4aaxLxTwubfTJmieSQG57rz9Lc9IzrP66UWdq0qffHQdc1tGjmxRyR7mREvDJM/QwPNRL1VUYp9dlBVbj1tM3P54Ou63jU1Pc0vLj9cs7YuoRt/XWoNjQ28jRbTw4bw7p3+Ts+f/ZmeEHXVfLHzrOcMyzvE4zzJXHHahjyFEwI9sijGom68g9KmyWNG3duDbqusaqJ7AwsmnVGBM4aIdi7BA9P40wDIGlxCAbkXPVDT+mlrZt7nwi6rqM52Nl2lmOx9XHHepsyQCZEl2Ipu7hYypX4nnLdlc33PL0r6JpeStV/N+mF7f/EOV8epsaZoweXZK9WWJ7a2LMp6LrGKr2go4vbbG3cEXMyXpgGYUuNRNV+Lc2a1KaerwRd17FU7Xcy1NX+asHFrQmHX1BQGvmQ3bPPSeVLpb6cLuS7T71398Gg6zpez8+f0doQSywTnH00bgl7MES3X2OCITrSSNTNuTe23lOdjUSrLk9PXzmzaUrMWq65uC5hh2ujiQuGiMWQ9XVVbzTH42Bn2/mRiHVLwmYXFKQJ2U6cI+trnzN8sc/1187Z/NRQ0HWVq6rvYejq9oWWw9fEbTEnXPfsi6eLBV/tlcqsSdVf33k2tKDjH20Ly2OONSWsl2/V1ki0Kj7/FxZ2nBnhvDtusflha5yZsjm0MfCk/o4n5E0tdzz1bNA1TZSBRbPOcIy92rb53/OQPfEoMTJwW/DVPTmfLZ20eceOoGsKNPx3d57lzLPkJ8GxJOFYqTAtwindIsp76ncFY5a1hOhZc0OLOubZjHXHHPE3YbllW75YKOPJNNO6e5t0br968xOB3bIN7DM/uKDtrVHB18Uj1qtCtwgnIpDzVU5LdWtYnzL7+7dOScxsbfyUxdkNcUfEwjRZq7hYiCPnyu2FvFnaeu/OnwRRS8Xztr9z5tSE7azlgv+DE9Jpoa40W/PAkpY7//yHoOsK2r6Fs/66QTjrI4LPC+U0bWWglflmVrorJm9+Zm8l37+in/PgovYP2pzdFLdDtiCEjTw9xlO7PN/c1Hx3z3eDrqvaDHS2v8dx+Oq4I07PeBp+SLaN0gKtvCd3ez5WN93d841KvX9FPt+BBR1/41js1rjN3xq+paAceV+DwXx5T06tbbv3yf1B11St9s6fMzkVs1eCm3+MWeFsJFrw5Y8KHm5s3rzzdxP9vhOawZ2L2xqmKdzIhPh43BbRMDWBKE30yPny0WzeLJl8z86fB11XrTjQ2fbGhCPWx5xwNmXJ+bqglb59r9Cfab+zd3gi329CDHTNme8Ia13cES8LY/unrKf6Ic26bXXY/qkS7u6EmOd0/DPAliUc0RymO0Gldmw5Tz/haX9Z84Yn75uI9xr3z3LfgrY5CSHWRS22wIS1caZSGzKeu2zq5l1PB11Trdu3qH12grG1ESEWhraRqMZGqdWyprt2PjWerz9u4X/4QljnTOm4zrbZ0miIG2dqZZY1bOy5N+i66s3AovarbLB1YW4k6kuz7rd7e7580SOQ4/H64/L5DXS1XWhx0Z2MiPMLMnyLcLJSuUyp25+RQ91nj2PjTDLa/s6zkklHLtNgn0jYwgnTGNKhuQGefNTz9NLml3gGw1icVEb3zp8zORbhq2xLfCgqOA/DM++Awx/zpH6SL8hlp9zz1G+CrisshhbMPtcSTnfcYW92FZBTIbp7ZAvkldLaN1/Lemr11JO4e3TCn9lQV9u7LCHWxB1xRrgW4Yw0zvRUn4G5qeHOyt2XJaOlF7V/kDG+OuGIqaGaN8JH5o24cpfUbHnjhh3fP5HXOu7Pqn/+nJdbUf6ZVMSe52kTvhlZ2kBK+Y2CsG+a9P0/VbxxJhntQNfc6VGmVluW9f5wzhhlyEi5VUIuabnzqeOaMTrm3G6/Ynr8Zcnk9YyzG2K2SIbxeivj+o8rgyVNG4KZi02ObnBB21uFEOuTEfHKMM4NyEuVVhq3DfrZz461keiYPp/+xe2XO4Z1JyLWX4VlFRZQfNhlgyOQ89WQUuqW52Tv7dXUOJOMtu3Stsjrm/gnbME+HbVF47CnoENwhBrVSNSX/6OkWTqWRqLHzHB/5+zTLZuviQjr3WFqnAm8uP4658l7XbClp2zo+XPQNZGxeWFhx5kR6PVxx74yjP0hio1E9XczUq6cvvno/SGOGv7swo6PGMFWJWwxKaydV7TPlqXu3nF30HWREzPY1bHAFlgbd6y2cA1KFztDZT21n2mzOnGUzlB/8Vn0Xz3ndbYlupOOFbrGmQ3FayeplPqSZt7aprueHQi6LnJynus8taXJiq3ggn80ZglrOERjVaMaiUq5tHXjk4+W/5lDud616PTmSXCWGy6ui1ncGvZ0uD4kiyHrmp+72l9y+IdEal//4rmvcwzrTjjsgoIKYSNRqSVX6kv78nLNrPueGSz9DumujgXgrDsZEbPDdXpUWkut9vvK3Ny4seerI78idWgVwD++oOMjtsVWxBwxOUxT0EuXsxlfPQlplqU29mxi/V1tmxqiztV65J59WKRsDmUA1/e/J6Ve0XKMgRFSXwYWzTpDwF4Ttfi7QtdI1ObgjGG44N3N5PzTTMZyYGyr+FC4On7I2mGNM3/vS7OkcVPPg0HXRYLRv6hjXjRMjURH8s18iaT0wA5eOrWYdtsCi0bAbLv4B+tsJ3Cocaanslqp28LaOJOM9vt3TUnM9htvEBa7PmaJRF1OXmPFXZrxfZiCC/jFRYHs4LxpxX9rKewRBzwaAYQAYGr+Cri8cWZBqy15qW9s3dD7x6DrItWlf/6cl8cS1mfqqpEoG/mPUtAFF3BH5qeN7AxeDH+JMQBjYBEHLBoBOK/Js4DR9+zVM1KplY0be+8Iui5S3YYWdLzbstjNNb9gjTFAa5iCC+N6h3Jdjh/xLwEwBRd6OFM8TSj7ea1otAU4gJwnvzqkzbkUfDIWjZt6vjekzatynvqqANBo/2VEqtpx5Pcvj/zlSkd8S4BFo2BOdY8HlE9syHjqVwVPLZ30g95Hgq6L1KYDV51xUTQa6U461muqfsJbKfSeD1MoAFKN+vmRHHu3xljxf1LBZLIw6WxxsKD08yphUFyE0xwRUNoMpH15/YP+jjdQ8MnJmHTProc/t6fnDemCf4PSZrA5IsBZlQ2DlbLoS5h0FiaTLQZ/DBk99pH/cKXxAMcBog6YEFVxFlDeODObN8un3DO+jQ4J2begbU7CttZGBesyqJJGoozBKAUUPBjvyNf1x/zrxxX+EmMAzouDghEnkEHB0S2O1Z8UNc4kFTCwqP0qW7B1CSvARqKlwTzXKw7maX1CZ+InNpoxMlnA5AvQ6UyxgNLPK4ABaHYEmDGFnCu7n/H6z6Pgk0povmvnPc8P9Z+X9eQtzKDQ7IjKhb90Xe96xdzlC8d9tB/1cid05C93aFDQAotN7CSh0j17hwNZT/0kr/SNkzb1/nbc34iQMTjQOeecmG3fknDYmyf0MXTlk3TyYxvMG9PLnnT4S4wBwADHKk4Ssqyyn5/kS6OscaYr9xiDmxo29HzzpF+4Bg0v7DgzlUo9yb7+uB90LSV/7DzLOc2SsxtC2vAku7jjA2BYNe4PoC2FW8riJB1PAjjxI/3hxu8mJmPF83HPh05nYbI5QJ3YtcjhGu3i0T5TUN8s6Py5YQz+voWzpgwv7viONGbrC3t3RYOup9zUzN6oNGZbZtHcb+9bOGtK0PVUWuLOnm/kB3PnZV35LYeP09wAVpyZZ7I56HQW8Pxivsbx0nr8ZzCM03WJARARDE0RgZyvf1vw5MWpDTs+MGnjc3vGveYql1kw971x5mxPxZ2/Z2A605KsmqM+AOSScd+AIZGw3xtjzvbMovb3BF1TpZ2y5fndybt63i89eXHGU//dFBGICHb8twVHjadlJ3Q8beKmL53EP6J0zx7GDGYLcukvBtRrmzb1/njCaq1S+7va/ja7uOPBRIx/27H4qZ6rYJhRVlZWzyQLAKKgGWCk6ypELH5qwrH+X/aauVv3d7a/IujaKi25qffH+wf1+TlXLmPGDJXmBrykUQfN7EkP5o2FNWGvXFJ2+gLXAl5iULDUODNT8O81YEvDeB25/Yrp8ZelUksMw/XljzaPW9U/1TQnNfIAGh0xTxv8Xbar/bZ+lV8/1nbS9aD9wV4XQPfBzrb7pFLrksdqJFo2mIe8CyPlqJ9PpMpsTSOzjYwszkLSmSxM2Syk0iKcpoiAr1RvztMLUht2XhXG4A93tb3tZankr+MRsRyMRQdqcImpATDgKTDGovGYvaLFSfy6f2HbFUHXVWmtm3ufSG3onZ8pqIW+Ur1NUQGLj1wKHMqEKuYhnS0Gv4KzZyt7KCn9wzwfJp2ByeVhlEbU4uAwXjrnfa7fy706tSF8HXMHumbOzF3T/v2oY//QscXZg66q3RVlKI5N+dpg0FVwLP7ypG3dn1vcccfAVbPOCLq2Smvc1LNxIJd9TTrv3S5gvKjFYZQubv/pzMhgXuWnzAdzHlm28sjOZiFz+b15KS9q2NR7/Wmbn+8PpKaA3N0JMdTV8XFbONtjtr04r3TdtZVK+8VFMTHHusaO2dszC+Z+bFVQ215ATr1398GGDb2fLBj8nc7l99rZbOArZoP9AhhDhBm42cKuMHbM7e/seP1lTsfPGmLW7YLz1gG3+ISZWj3aHw0DoA0w4CoIzk9JxMQXbrhm7s/6r577uqBrq7SWO3f80s3ln42wiR3MG4vA974GAGMVGHisIn+aP6M1s2juFx2H/Sxmi9cNuioUz5ZjAArKYNBTiFni9baNn2cWtn/huc5TW4KurZKYYVY1jOMEHv6wGbq6feHpieR/JSLiOsMYH/Tq6xR/rAY9BTDGE1H7Y62R+H/1L+joCrqmsKHwV8jBhW1n5xZ13JeKWXfZnM8ZcBVkDQ/onSwGQGqDAVfB4qKtMSo2pBd13Hews+2soGsLCwr/BHuu89TY0KL2FVEuHotFrLcPS10fzSHHCUPx/ndaaiQj1ttjEf7YUFf78kc7T40FXVu9o/BPoIML51zSGkn+siFi3wzGkgOuqobeJ1XJjAwIGvBUQ8xe8won8f8PvmPmxUHXVc9CNdBWKXs6Z5/eYImbbEu8T3CGQbe4BJOO9sfGAHjawHMVUjZ/JY9HHxpe2P5t3+hVrRuffC7o+uoNHfnHWXpR27VNjv1YImq/z9XAcJ3ds6+UYV/D00Aqar8vZlmPpRe2fyjomuoNhX+cHLxq5mtyizr+I+nYX+WcTxtwFdR4resOIQZAmeKAIGd8ejJifS23aO5Ph7raXx10bfWCTvtP0pOdsxsnWfYyS+C6mCUipUU4FPrxwQDklUZBAY2OeJOReP3wgvYv7rPMuvY7e4eDrq+W0ZH/JKS75r5zWtR6LBUVN2iwSC0uwqkVpcVCBiySitufmg7xWHph+zuCrquW0ZH/BBzonDs3aum1MYe/0xjQgF6FlC8WStr8ZQz8B+mFHZsLmi+ftOnPPUHXV2voyH8cHr4QVmZh+w1xB48lo/Y7s1Ijc6Q12mTCZfzifIlk1OqMW+axTFf79Q9fSAez40HhH6PBro43nTO949FE1L6VcdZUWoRDglNaLMQ4a07E7NvOnT73l+mr514UdF21gsL/Ep656oxp2Wvav+pY/KcJR5w76Cq4IViEUysYAFcVLwXiDj+PO/hpdnHHvzzdOXNq0LVVOwr/MWQXzf2H1ljkN3HbvlYaYCiki3BqxaCnoQzjccf6SKvlbM8unvu+oGuqZhT+IziwoO2V2cUdD8Yd/k1HiBl0z742lM8NiNhiRtzm38oumrttf1fb3wZdWzWiAZIy/R88p9HOZK5nhzXOpNDXFoZRjUQvNT4uTHe1f9ZvaPhcy9cfHwq6vmpBR/5yL/T/YzJuLWec12TjTDLaoUainMeSSWeFfmHgI0HXVE3oyF9G5fNRDCi43Cq2Fx959gCpUYyBGQM37yKe82GyflU96ShoFP4y3EBByuKzzm0biEbA7PF75iCpkEO98CVQKBT/3+HgFlTAlVUVCv/hSv3UfR+QEnBGdgJCADCga4Eqxor/MVIBBbf4HZaeehNws8xqROE/mrLHJ8HzgUgELOoAnNNZQDViDNAapuDCuC6Ffgwo/C/l0DMGCjCeBxaNgEUcGg+oFqVnQhbcYh98rSn0Y0ThH6vSkSWXf3En4NgAaCcQCMYAGBjPK4ZeqrKfk7Gg8B+P0oYlFUwmB2NbYLEomEWDghVTOhOTsvgkW79yD7asNxT+E1Ha0HwJI7OAY4NFI4AQtAOYSKUnPhdcGM+f8EdY1zsK/8koGxQ0nv/ieAANCo6v8sG8Ag3mjRcK/3go7QTyZYOCDg0KnrTSYJ47EnpFg3njicI/nhgDlIbJ5mFcv2xQELQTOB6lnannjwzm0XX9RKDwj7dDg4ISJlOaJBQFs0Tx57QTOLqywTyUruvLfk7GF4V/opQdveBLwHGKk4RoUPDIDg3mecXp1TSYN+Eo/BPt0KCgWzZJKAJwGg8AMDKYZ4qTqGgwr6Io/JUyalCwbDwgrIOChwbzRibpKEWhrzAKf6WVTm+zORjXAotFisuHgXDsBA6tuPNh8jSYFyQKfxDKBwXTcmSSUBSw6njl4MiKO0g1sk6CBvOCRuEPUvktLV+CRZzieICos0lCpVugbqG4SpIG86oChb8aHFo56I6eKVjr4wGHVtwVYAoerbirMhT+alIa+c7lYVyvuGjItmpvJ1AKvecXF98oBYBCX20o/NWmdG2sFEwmW1w5GI282FOwmpV1QTIFl1bcVTkKf7UqXznoS5iIAyRjYIwxUdBVlSbuKsZSjEEq6GwecL3iLyj0VY3CX+1KAXI9GK1guPCmTZvmA3uCravMwcZWf1o+7RqlAV9R6GsE9e2vFYyBwUC7boF9/XE/6HLKnb35Cc/k3QIHjeLXEgp/rWHVmS7GeFXWRY6Owk9ISFH4CQkpCj8hIUXhJySkKPyEhBSFn5CQovATElIUfkJCisJPSEhR+AkJKQo/ISFF4SckpCj8hIQUhZ+QkKLwExJSFH5CQorCT0hIUfgJCSkKPyEhReEnJKQo/ISEFIWfkJCi8BMSUhR+QkKKwk9ISFH4CQkpCj8hIUXhJySkKPyEhBSFn5CQovATElIUfkJCisJPSEhR+AkJKQo/ISFF4SckpCj8hIQUhZ+QkKLwExJSFH5CQorCT0hIUfgJCSkKPyEhReEnJKQo/ISEFIWfkJCi8BMSUhR+QkKKwk9ISFH4CQkpCj8hIUXhJySkKPyEhBSFn5CQovATElIUfkJCisJPSEhR+AkJKQo/ISFF4SckpCj8hIQUhZ+QkKLwExJSFH5CQorCT0hIUfgJCSkKPyEhReEnJKQo/ISEFIWfkJCi8BMSUhR+QkKKwk9ISFH4CQkpCj8hIUXhJySkKPyEhBSFn5CQ4g0Wh2CACboSQsiEMwAEAxosDj7k669ZjKHBYkHXRQiZYA0Wg8UYhnz9NX7Kg33XusZc4irz2xabw+GMzgIIqSMGgMMZWoWdc1UAAAvqSURBVGwOV+Fx15hLTnmw71oOAK1b+360Vydem9FYro3JtNgcHHQpQEgtMwA4A1psDmNMOu3JZb/Q8de1bu37EQBYpT/Y/mCvC2DdwSum3pdVZm3CYldqA2QV7QIIqUVJwcAZkJXm3qxllk/74b4ngH2Hfm8d/hdaH9j7RwDzh+ZNXwRm1rU4fOawr+EbgEYFCKluBoDNgAabY9jXTyvOlrVs3bPhSH/2qLf6GrftuSvt8FdlFL7AOfObaECQkKrGADTZDIwzP+3rz+9x+LktDxw5+MARjvzlTr1390EAH+9/2/QfaIVbmm3++rwyyGtDZwGEVAkDICYYYpwhLdUvJPSNrVv3P/pSf29Mk3xa7t/zy8atey7ISnOdNjjQ6nBwmhtASKBKA3qtDoc22J+W5rrGrXvfOJbgA8c3w8+ktu75csbW5w17+H6MM6ToUoCQwDRYpaO9vkNqc17j1j1fxnEck497eu+0+/Y+07ht97s8g7cVlPlji0NzAwiplEP37B2OnDL/60Fd0bCl793N2/p2He9rnfDc/oYtex7oE/75w65ZwwyyzTancQBCJhBD8Z49M8gOS7N6l69f0/DAvi0n+nrHHPB7KWfe/0IawMqBeTPu8Tx1S6PDL/Z0cW4A7QgIGT9xwWBzYFjpBz3Dl07euvt3J/ua47Kqr3nb7t+1PLj3kmGXvVcZ82yrw2HRgCAhJ8UAsBjQ4nBIbZ5NK/b3TVv65k3edvLBB8Z5SW/zQ7u/k9ORVw948t8EY2i0aMUwISeq0eIQjGHA1V/LCXVe85bd3xvP1x/3dE7e9szelm37Puwb/Xeu1v/V4nBEaECQkDExACIji3AK2jzmQ1/U8mDftVPu37/vJf/ycZqwQ3Pz1r0P74o1XzDkqU8ZYwZobgAhx1a6Zw+Y/kEP1++YPu2C5i17H5mo9zupAb+XcvbmJzwAtx2YN+OHUGZtQrBOWixEyF9KCgYwIOObu/NMLJ/84PM7gd0T+p4TGv6SSdt29wC4enDe5HdYXKxrcfjctNTwdCXenZDqVLpnn7IYMr7+swSWNW/tu6dS71/REbmmbfv//YAVeU1amtuMgUdzA0hYMQDNNgeMcYc8dWuvHTm/ksEHKnTkLzfrvmcGAXzqhUtO25yHvz4Rtd7EfBOrdB2EBMUwxG2bI1tQP3UNlkzatnd7EHUEdi/ulIee+01y6943Zz31CQPznFl1YcV3RIRUmvngOTYMdmVd9c/JrX1vmbStL5DgA1XQujv5QN/ndVK9E398hEYBSf0beFyrpHpnckvfF4MupSqOtpM3H8gEXQMhlcA2QwHVsb0HfuQnhASDwk9ISFH4CQkpCj8hIUXhJySkKPyEhBSFn5CQovATElIUfkJCisJPSEhR+AkJKQo/ISFF4SckpCj8NYQBMGAy6DqOxDAmqStTbaHw1xBXAzbDGfsvm/aGoGspNzBv2gUWw+ku9WSsKRT+GuJqA4uxqVHgP9PzZnzh+TfNaA2ynj1XTD8lffn0LwqG/xSMTXU19WOpJRT+GsIAFLSBAaykg481RPWvhy6dtjiIWoYum3ZNUptfJy12nQFEQdPzGWsNhb+MNrzqPw8GQBqg39NwOJsdt9n305dNu6/v4qlnV+L991425eWZeVPvj1vsDoezWf2ehjSojeAb2t7L0YdRhgsYWAyiRp4slFUGaWmQsPjbExZ7LD1v2vKdl7ZFJuK9Hr5wZjR96dQVMcMei9viirRvauLhKwaAYCg+8ZKBRiXKUPjLaEt8PZtX37I5Q4NVE8cyGAD9vgZjLJl0+JrJIvur/ZdOvXQ832P/JVPnvTLp/ioZETdzzhP9vq6JnSMANFgMFmcYyqlv6UjkG0HXU01qYwuvsIOXTbvYAVuXtNk5GWng1tD1bMpi8DVgjP72ALNWnrbl+RN+5tPzl844tYmpm5ng77UZkJa1EfnSwy6TFkPGN4/njVk+eVvfQ0HXVW3oyH8ErVv7fvRsvOm1GQ8rtDGZlhp6stCwNPCNQcIW72s0avvgpTOuPZHX6b9k+kcauN6ecMR7fW0wXCPB5wBabA5tTCaj9PJn402vpeAfWa1s04Hpu2Lq2THF1yYsXCkNkKuB61ygePSLC4YoZ0hL9R8+t5ec8sBzv3mpv/fC5aeeF4XsjgnxJlcb5FTtnPUkBANnQEGZH/raLG19cO8TQddUzWrlew3c0KXTFoNjTYPNZw37Gn6NjHAzAI02R1ZqT2v2pWe51f3XW58dOPzP7brs9OZmLZeCm+sSFneGauS63gCwGdBgcwz7+ill2IqWbXvuCrquWlAL22/VeH7+jNYGTy5j4P8Us5g15NdCPEpPgwVSFkdW6h0uzPLWLXt/UPr94GVTOy3G1iYs3lF6enItbBgMQIPNkNfwAfYvgx5bc9qPnu8Puq5aUQvfcdXpv3z6622ju5OWeENOGeRraECwdGo85OtNXOlvgVvvTzm4WhvUxK07oLgzi3GGmADSUv9CCb6k5f49vwy6rlpTK9ts1TEAG75s+kc5sCJps0lDfu1MduEAEhaDq4EIB7LSQKH6azco3q5vtDkyvjmgFdY2PrTny6iNaRlVp9q/76q377Ips6PGWu0Icw1nQKZGRsUBgDOglqbjpywGZYCCMXe4TN809YF9TwddUy2j8I+T/sunX2EZ1p2y8fK0NPBq6FKgmpXfs89K/Qff6OXNW/fdH3Rd9YC2z3G0v3NS0s7Zn7JgPhm3eLxWRsyrFQPQZHPkpMn6Gp/bk/dvO/uR6njCbT2g8E+AgXkzXsGFWp/g4hJfF+fA0wc9dgbFgUmbM2R99ZCGWNK8bffvgq6r3tA2OYEGLpnxHkvo1Umbn15LcwOCUn7PPu2bXQr6puate78bdF31irbFCbZ/3qSplrFucgT7cEQwDPu0sOxoGmyOgjJaKfP1ASZXz9p2YG/QNdUzCn+FDLxtxkWWNt1JwV6TVQbU/KLIAIhyhoRgyEj1K8mwtHnL3keCrisMaGFPhTTfv/vhZ2NNbxzyzKeNMQMtNgcPefo5Ky7CMTD9A7761I4ZM95Iwa+ckG9+wXh+3oyOBmHWRhk6NYqTbMImOdIvoaBwt8v48slbnt8ZcEmhQ+EP0ODlU99pga1JWPzMWppTf6LK1xhkpP6z8tXyph/t//eg6worOu0PUNOWvT84YEXOT3vqVhh4zTXUN+B4MQDNNgcMvLQyn3nBipxPwQ9WvW5rNafv8lPPS9XoOvpjKfUViHCGgtQ/zXNr6Vj6CpCJVw/bV13pv3zyhy1mrUwJNq2WFgsdrnwRTlqqPcyw1amtfV8Pui7yIjrtrzItW/Z/bcjwc9O++rZTQ41ED9dgMTicIevrbw1y+1wKfvWpzS0rJA7Om3aJw7AuafFXZlT1NxI9vHGmB7OsdWvfj4KuixwZHfmrWOu2vof26sRrhz21spobiRq82DjTGJMe9vSKX+j46yj41a0atyVyBAevmHq2Y/jaqGBXKl1dD8xICAbBGQrS3Jux9PJpP6TGmbWAwl9jRhqJrm2w+cwgFwsd1jjzaRi2vJEaZ9YUOu2vMY0P9t2ZdvirMgpfYGCqKYABweI6ewYOJtO+/vweh59Lwa89dOSvYf2XTXuDAOtOWez1+Qo0En2xcSZDWqpfMMGXNFDjzJpF4a99LH3Z9I9ipJHooK+hxvlSoPSwy6ZS40xgTePWPV8BNc6saRT+OlFqJBoR5ho2zo1EUxaDNoBnzB2a6ZuaqHFmXaDw15nhy6dfYYxZ32Dzs0/mIaPl9+yHfP2/nOslDQ/s2zLe9ZLg0IBfnWnYsueBPuGfP+yaNcwgeyKLhUqLcJhBdtg1N++Oy/Mp+PWHjvx1bGDejFcYo25pdPjFnsaYGonGBYPNgYyvH/Iglkymxpl1i8IfAgOXzHiPbenVCevIjUTL79lnfP2sZnxF45bd3wuqXlIZFP6Q2D9v5lQL+VUOFx+KcIZh+WIj0QaLw9UGnjJf8221asr9+/cFWCqpEAp/yAxcNvUim7H1ccFfnVMGccGQVeYxCb2E+ucRUv/Y0BVTP5J9+/Te/kunXht0MSQY/wcVNiGxR5kjVQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  )
}