#! /usr/bin/env node
import inquirer from 'inquirer'
import download from 'download-git-repo'
import chalk from 'chalk'
import ora from 'ora'
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
    .then((answers) => {
        const { tarName, template } = answers
        const remote = `https://github.com/yang-xianzhu/atom-cli/tree/main/templates/${template}`
        const spinner = ora('download template......').start()
        download(remote, tarName, { clone: true }, function (err) {
            if (err) {
                spinner.fail()
                return
            }
            spinner.succeed()
        })
    });
