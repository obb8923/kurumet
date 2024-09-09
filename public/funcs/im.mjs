// public/list 안의 json파일들의 유튜브 임베드 주소를 편집하는 코드
// 비디오ID?si=~~ 이런식으로 작성된 것들을 순수 비디오 ID만 남도록
import path from "path";
import fs from "fs/promises";

async function modify() {
  // 현재 작업 디렉토리
  const basePath = process.cwd();
  // public/list 폴더 경로
  const dirPath = path.join(basePath, "public", "list");

  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        const data = await fs.readFile(filePath, "utf-8");

        try {
          const jsonData = JSON.parse(data);

          // youtubeEmbed URL을 수정
          jsonData.list.forEach((item) => {
            const embedUrl = item.youtubeEmbed;
            const videoId = embedUrl.split("/").pop().split("?")[0]; // 비디오 ID만 추출
            item.youtubeEmbed = `https://www.youtube.com/embed/${videoId}`;
          });

          // 수정된 데이터를 파일에 다시 저장
          await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
          console.log(`Modified ${file}`);
        } catch (err) {
          console.error(`Failed to parse JSON in ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

modify();
