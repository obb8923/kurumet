export default function Footer() {
  return (
    <footer>
      {/* 큰 화면 배치 */}
      <div className="hidden md:block">
        <div className="flex justify-center">
          <div
            className="flex justify-around py-10  text-gray-500 mt-10 border-t gap-10"
            style={{ width: "90vw" }}
          >
            <div className="flex flex-col justify-between">
              <div>
                <p className="logo text-5xl">kurumet</p>
                <br />
                <p>우리 동네 맛집은 어디에 있을까?</p>
                <p>광고는 믿을 수 없지만 내가 보는 유튜버는 믿을 수 있어!</p>
                <p>유튜버가 추천해 주는 맛집을 한 눈에 볼 수 있는 kurumet!</p>
              </div>
              <div className="flex flex-col">
                <a
                  href="https://github.com/obb8923"
                  target="_blank"
                  rel="noopenner noreferrer"
                  className="hover:underline hover:text-gray-900"
                >
                  개발자 깃허브 바로가기
                </a>
                <a
                  href="mailto:obb8923@gmail.com"
                  target="_blank"
                  rel="noopenner noreferrer"
                  className="hover:underline hover:text-gray-900"
                >
                  개발자 메일 주소: obb8923@gmail.com 바로가기
                </a>
              </div>
            </div>
            <div>
              <p className="text-xl">kurumet 사용방법</p>
              <br />
              <p>1. 지도에서 맛집 찾기</p>
              <p>맨 위의 메뉴에서 유튜버를 클릭합니다.</p>
              <p>
                지도에 나오는 마커들 중, 정보를 보고 싶은 마커를 클릭합니다.
              </p>
              <p>
                유튜브로 넘어가 유튜버의 평가를 확인하거나, 카카오 지도로 넘어가
                검색을 할 수 있습니다.
              </p>
              <br />

              <p>2. 리스트로 보기</p>
              <p>맨 위의 메뉴에서 유튜버를 클릭합니다.</p>
              <p>리스트로 나열된 영상들을 확인할 수 있습니다.</p>
              <br />

              <p>3.검색하기</p>
              <p>
                맨 위의 메뉴에서 프로그램이름,지역별로 검색을 할 수 있습니다.
              </p>
              <p>검색결과를 클릭하면 선택할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
      {/* 작은 화면 배치 */}
      <div className="block md:hidden">
        <div className="flex justify-around py-10 px-5 text-gray-500 mt-10 border-t ">
          <div className="flex flex-col justify-between gap-5">
            <div>
              <p className="logo text-5xl">kurumet</p>
              <br />
              <p>우리 동네 맛집은 어디에 있을까?</p>
              <p>광고는 믿을 수 없지만 내가 보는 유튜버는 믿을 수 있어!</p>
              <p>유튜버가 추천해 주는 맛집을 한 눈에 볼 수 있는 kurumet!</p>
            </div>
            <hr></hr>
            <div>
              <p className="text-xl">kurumet 사용방법</p>
              <br />
              <p>1. 지도에서 맛집 찾기</p>
              <p>맨 위의 메뉴에서 유튜버를 클릭합니다.</p>
              <p>
                지도에 나오는 마커들 중, 정보를 보고 싶은 마커를 클릭합니다.
              </p>
              <p>
                유튜브로 넘어가 유튜버의 평가를 확인하거나, 카카오 지도로 넘어가
                검색을 할 수 있습니다.
              </p>
              <br />

              <p>2. 리스트로 보기</p>
              <p>맨 위의 메뉴에서 유튜버를 클릭합니다.</p>
              <p>리스트로 나열된 영상들을 확인할 수 있습니다.</p>
              <br />

              <p>3.검색하기</p>
              <p>
                맨 위의 메뉴에서 프로그램이름,지역별로 검색을 할 수 있습니다.
              </p>
              <p>검색결과를 클릭하면 선택할 수 있습니다.</p>
            </div>
            <hr></hr>
            <div className="flex flex-col">
              <a
                href="https://github.com/obb8923"
                target="_blank"
                rel="noopenner noreferrer"
              >
                개발자 깃허브 바로가기
              </a>
              <a
                href="mailto:obb8923@gmail.com"
                target="_blank"
                rel="noopenner noreferrer"
              >
                개발자 메일 주소: obb8923@gmail.com 바로가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
