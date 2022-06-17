import express from "express"
//tambahkan baris kode ini untuk import models
const models = require('../models/index');

const router = express.Router();

/**
 *  Route untuk mengambil semua data artikel
 */
router.get('/', async function(req, res, next) {
    try {
        //mengambil semua data
        const posts = await models.posts.findAll({});

        if(posts.length !== 0) {
            res.status(200).json({
                'status': 'OK',
                'messages': 'Data Posts is found',
                'data': posts
            });
        } else {
            res.status(404).json({
                'status': 'EMPTY',
                'message': 'Datas Posts is empty',
                'data': {}
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': 'Internal Server Error'
        })
    }
});

/**
 *  Route untuk mengambil artikel berdasarkan ID
 */
router.get('/:id', async function(req, res, next) {
    try {
        //menangkap param ID
        const id = req.params.id;
        const post = await models.posts.findByPk(id);


        if(post){
            res.status(200).json({
                'status': 'OK',
                'messages': 'Data Posts is found',
                'data': post
            });
        } else {
            res.status(404).json({
                'status': 'NOT_FOUND',
                'messages': 'Data Posts is not found',
                'data': null
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': 'Internat Server Error'
        })
    }
});

/**
 *  Route untuk membuat artikel baru
 */
router.post('/', async function(req, res, next) {
    try {
        //menangkap form data yang dikirim melalui request body
        const {
            title,
            content,
            tags,
            published
        } = req.body;

        //membuat data baru di db menggunakan method create
        const post = await models.posts.create({
            title,
            content,
            tags,
            published
        });

        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan tatus OK
        if(post) {
            res.status(200).json({
                'status': 'OK',
                'messages': 'Post added successfully',
                'data': post
            });
        }
    } catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
});

/**
 *  Route untuk mengupdate artikel berdasarkan ID
 */
router.put('/:id', function(req, res, next) {
    try {
        const id = req.params.id;
        const {
            title,
            content,
            tags,
            published
        } = req.body;

        const post = models.posts.update({
            title,
            content,
            tags,
            published
        }, {
            where: {
                id: id
            }
        });

        if(post) {
            res.status(200).json({
                'status': 'OK',
                'messages': 'Post Updated Successfully'
            });
        }
    } catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
});

/**
 *  Route untuk menghapus artikel berdasarkan ID
 */
router.delete('/:id', function(req, res, next) {
    try {
        const id = req.params.id;
        const post = models.posts.destroy({
            where: {
                id: id
            }
        });

        if(post) {
            res.status(200).json({
                'status': 'OK',
                'messages': 'Post deleted successfully'
            });
        }
    } catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
});

export default router;