import gulp from "gulp"
import squoosh from "gulp-libsquoosh"
import rename from "gulp-rename"

const basePath = "static/raw"
const resizedPath = "static/processed"
const tasks = [
  {
    glob: "areas/*.{jpg,png}",
    destination: "areas",
    widths: [2560, 1920, 1280, 960, 640, 480, 320],
    quality: 80,
  },
  {
    glob: "stages/**/*.{jpg,png}",
    destination: "stages",
    widths: [512, 480, 256, 128],
    quality: 80,
  },
]

export default gulp.parallel(
  tasks.flatMap(({glob, quality, widths, destination}) =>
    widths.map(
      width =>
        function (complete) {
          gulp
            .src(`${basePath}/${glob}`)
            .pipe(
              squoosh(
                {
                  webp: {
                    quality,
                  },
                  preprocessOptions: {
                    resize: {
                      enabled: true,
                      width,
                    },
                  },
                },
                undefined,
              ),
            )
            .pipe(
              rename(path => {
                path.basename += `-${width}`
              }),
            )
            .pipe(gulp.dest(`${resizedPath}/${destination}`))

          complete()
        },
    ),
  ),
)
