#! /usr/bin/env node
import inquirer from 'inquirer'
import download from 'download-git-repo'
import chalk from 'chalk'
import ora from 'ora'
import fs from 'fs'
// import { program } from 'commander'

inquirer
    .prompt([
        {
            type: 'input',
            message: '请输入项目名称',
            name: 'tarName',
        },
        {
            type: 'list',
            message: '请选择项目模板',
            name: 'template',
            choices: ['vue', 'react'],
        },
    ])
    .then(async (answers) => {
        const { tarName, template } = answers
        const remote = `github:yang-xianzhu/atom-cli#templates/${template}`

        // 检测该目录下，有没有同名文件，有则询问用户是否覆盖
        if (fs.existsSync(tarName)) {

            const { overwrite } = await inquirer.prompt([
                {
                    type: 'confirm',
                    message: '目录已存在，是否覆盖？',
                    name: 'overwrite',
                },
            ]);

            if (!overwrite) {
                return;
            }
            const spinner = ora('download template......').start()

            downloadTemplate(remote, tarName).then(() => {
                spinner.succeed('download success')
            }).catch(() => {
                spinner.fail('download error')
            })
            return
        }

        const spinner = ora('download template......').start()

        // 没有同名文件则直接下载
        downloadTemplate(remote, tarName).then(() => {
            spinner.succeed('download success')
        }).catch(() => {
            spinner.fail('download error')
        })
    });


function downloadTemplate(remote, tarName) {
    return new Promise((resolve, reject) => {
        download(remote, tarName, {}, function (err) {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}