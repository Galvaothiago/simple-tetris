addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))

    const width = 10
    let timerId

    const gradientBackground = [
        'linear-gradient(117deg, rgba(84,16,108,1) 0%, rgba(130,88,135,1) 80%)',
        'linear-gradient(117deg, rgba(255,128,0,1) 0%, rgba(254,203,131,1) 80%)',
        'linear-gradient(117deg, rgba(12,97,26,1) 0%, rgba(110,213,87,1) 80%)',
        'linear-gradient(117deg, rgba(43,88,247,1) 0%, rgba(88,208,255,1) 80%);',
        'linear-gradient(117deg, rgba(255,253,30,1) 0%, rgba(255,249,155,1) 80%);'
    ]

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0
 

    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    function draw() {
        current.forEach(index => {
          squares[currentPosition + index].classList.add('tetromino')
          squares[currentPosition + index].style.background = gradientBackground[random]
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.background = ''
            
        })
    }


    function control(e) {
        if(e.keyCode === 37) {
          moveLeft()
        } else if (e.keyCode === 38) {
          rotate()
        } else if (e.keyCode === 39) {
          moveRight()
        } else if (e.keyCode === 40) {
          moveDown()
        }
    }

    document.addEventListener('keyup', control)

    // timerId = setInterval(moveDown, 1000)

    function moveDown() {
        freeze()
        undraw()
        currentPosition += width
        draw()
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition +=1
        }
        draw()
      }

      function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
        if(!isAtRightEdge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition -=1
        }
        draw()
      }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => {
                squares[currentPosition + index].classList.add('taken')
              })

            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
    
            draw()
        }

    }

    function rotate() {
      undraw()
      currentRotation++

      if(currentRotation === current.length) {
        currentRotation = 0
      }

      current = theTetrominoes[random][currentRotation]
      draw()
    }
})
