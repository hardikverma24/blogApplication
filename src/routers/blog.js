const express = require('express')
const Blog = require('../models/blog')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/blogs', auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    })
    const blogs = await req.user.addBlog()

    try {
        await blog.save()
        res.status(201).send({blog, blogs})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/blogs/public', auth, async (req, res) => {
    try {
        const readBlogs = await Blog.find({owner: req.user._id},{isPrivate:false})
        res.send(readBlogs)
    } catch(e) {
        res.status(400).send(e)
    }
})



router.get('/blogs/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const blog = await Blog.findOne({_id, owner: req.user._id})

        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/blogs/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const blog = await Blog.findById({_id, owner: req.user.id})

        updates.forEach((update) => task[update] = req.body[update])
        await blog.save()

        if (!blog) {
            return res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/blogs/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete({_id, owner: req.user._id})

        if (!blog) {
            res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router