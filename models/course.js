const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

class Course {
  constructor(title, price, image) {
    this.title = title
    this.price = price
    this.image = image
    this.id = uuidv4()
  }
  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id,
    }
  }
  static async update(course) {
    const courses = await Course.getAll()

    const idx = courses.findIndex((c) => c.id === course.id)
    courses[idx] = course

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }
  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }
  static async getById(id) {
    const course = await Course.getAll()
    return course.find((c) => c.id === id)
  }
}

module.exports = Course
