#include <v8.h>
#include <node.h>
#include <string>
#include <cstring>
#include <iostream>
#include <cstdlib>
#include "sass_context_wrapper.h"

using namespace v8;
using namespace std;


void WorkOnContext(uv_work_t* req) {
    sass_context_wrapper* ctx_w = static_cast<sass_context_wrapper*>(req->data);
    sass_context* ctx = static_cast<sass_context*>(ctx_w->ctx);
    sass_compile(ctx);
}

void MakeOldCallback(uv_work_t* req) {
    HandleScope scope;
    TryCatch try_catch;
    sass_context_wrapper* ctx_w = static_cast<sass_context_wrapper*>(req->data);
    sass_context* ctx = static_cast<sass_context*>(ctx_w->ctx);

    if (ctx->error_status == 0) {
        // if no error, do callback(null, result)
        const unsigned argc = 2;
        Local<Value> argv[argc] = {
            Local<Value>::New(Null()),
            Local<Value>::New(String::New(ctx->output_string))
        };

        ctx_w->callback->Call(Context::GetCurrent()->Global(), argc, argv);
    } else {
        // if error, do callback(error)
        const unsigned argc = 1;
        Local<Value> argv[argc] = {
            Local<Value>::New(String::New(ctx->error_message))
        };

        ctx_w->callback->Call(Context::GetCurrent()->Global(), argc, argv);
    }
    if (try_catch.HasCaught()) {
        node::FatalException(try_catch);
    }
    delete ctx->source_string;
    sass_free_context_wrapper(ctx_w);
}

Handle<Value> OldRender(const Arguments& args) {
    HandleScope scope;
    sass_context* ctx = sass_new_context();
    sass_context_wrapper* ctx_w = sass_new_context_wrapper();
    char *source;
    String::AsciiValue astr(args[0]);
    Local<Function> callback = Local<Function>::Cast(args[1]);
    String::AsciiValue bstr(args[2]);

    source = new char[strlen(*astr)+1];
    strcpy(source, *astr);
    ctx->source_string = source;
    ctx->options.include_paths = new char[strlen(*bstr)+1];
    ctx->options.image_path = new char[0];
    strcpy(ctx->options.include_paths, *bstr);
    // ctx->options.output_style = SASS_STYLE_NESTED;
    ctx->options.output_style = args[3]->Int32Value();
    ctx->options.source_comments = args[4]->Int32Value();
    ctx_w->ctx = ctx;
    ctx_w->callback = Persistent<Function>::New(callback);
    ctx_w->request.data = ctx_w;

    int status = uv_queue_work(uv_default_loop(), &ctx_w->request, WorkOnContext, (uv_after_work_cb)MakeOldCallback);
    assert(status == 0);

    return scope.Close(Undefined());
}

void MakeCallback(uv_work_t* req) {
    HandleScope scope;
    TryCatch try_catch;
    sass_context_wrapper* ctx_w = static_cast<sass_context_wrapper*>(req->data);
    sass_context* ctx = static_cast<sass_context*>(ctx_w->ctx);

    if (ctx->error_status == 0) {
        // if no error, do callback(null, result)
        const unsigned argc = 1;
        Local<Value> argv[argc] = {
            Local<Value>::New(String::New(ctx->output_string))
        };

        ctx_w->callback->Call(Context::GetCurrent()->Global(), argc, argv);
    } else {
        // if error, do callback(error)
        const unsigned argc = 1;
        Local<Value> argv[argc] = {
            Local<Value>::New(String::New(ctx->error_message))
        };

        ctx_w->errorCallback->Call(Context::GetCurrent()->Global(), argc, argv);
    }
    if (try_catch.HasCaught()) {
        node::FatalException(try_catch);
    }
    delete ctx->source_string;
    sass_free_context_wrapper(ctx_w);
}

Handle<Value> Render(const Arguments& args) {
    HandleScope scope;
    sass_context* ctx = sass_new_context();
    sass_context_wrapper* ctx_w = sass_new_context_wrapper();
    char *source;
    String::AsciiValue astr(args[0]);
    Local<Function> callback = Local<Function>::Cast(args[1]);
    Local<Function> errorCallback = Local<Function>::Cast(args[2]);
    String::AsciiValue bstr(args[3]);

    source = new char[strlen(*astr)+1];
    strcpy(source, *astr);
    ctx->source_string = source;
    ctx->options.include_paths = new char[strlen(*bstr)+1];
    strcpy(ctx->options.include_paths, *bstr);
    // ctx->options.output_style = SASS_STYLE_NESTED;
    ctx->options.image_path = new char[0];
    ctx->options.output_style = args[4]->Int32Value();
    ctx->options.source_comments = args[5]->Int32Value();
    ctx_w->ctx = ctx;
    ctx_w->callback = Persistent<Function>::New(callback);
    ctx_w->errorCallback = Persistent<Function>::New(errorCallback);
    ctx_w->request.data = ctx_w;

    int status = uv_queue_work(uv_default_loop(), &ctx_w->request, WorkOnContext, (uv_after_work_cb)MakeCallback);
    assert(status == 0);

    return scope.Close(Undefined());
}

Handle<Value> RenderSync(const Arguments& args) {
    HandleScope scope;
    sass_context* ctx = sass_new_context();
    char *source;
    String::AsciiValue astr(args[0]);
    String::AsciiValue bstr(args[1]);

    source = new char[strlen(*astr)+1];
    strcpy(source, *astr);
    ctx->source_string = source;
    ctx->options.include_paths = new char[strlen(*bstr)+1];
    strcpy(ctx->options.include_paths, *bstr);
    ctx->options.output_style = args[2]->Int32Value();
    ctx->options.image_path = new char[0];
    ctx->options.source_comments = args[3]->Int32Value();

    sass_compile(ctx);

    source = NULL;
    delete ctx->source_string;
    ctx->source_string = NULL;
    delete ctx->options.include_paths;
    ctx->options.include_paths = NULL;
    delete ctx->options.image_path;
    ctx->options.image_path = NULL;

    if (ctx->error_status == 0) {
        Local<Value> output = Local<Value>::New(String::New(ctx->output_string));
        sass_free_context(ctx);
        return scope.Close(output);
    }

    Local<String> error = String::New(ctx->error_message);

    sass_free_context(ctx);
    ThrowException(Exception::Error(error));
    return scope.Close(Undefined());
}

/**
    Rendering Files
 **/

void WorkOnFileContext(uv_work_t* req) {
    sass_file_context_wrapper* ctx_w = static_cast<sass_file_context_wrapper*>(req->data);
    sass_file_context* ctx = static_cast<sass_file_context*>(ctx_w->ctx);
    sass_compile_file(ctx);
}

void MakeFileCallback(uv_work_t* req) {
    HandleScope scope;
    TryCatch try_catch;
    sass_file_context_wrapper* ctx_w = static_cast<sass_file_context_wrapper*>(req->data);
    sass_file_context* ctx = static_cast<sass_file_context*>(ctx_w->ctx);

    if (ctx->error_status == 0) {
        // if no error, do callback(null, result)
        const unsigned argc = 1;
        Local<Value> argv[argc] = {
            Local<Value>::New(String::New(ctx->output_string))
        };

        ctx_w->callback->Call(Context::GetCurrent()->Global(), argc, argv);
    } else {
        // if error, do callback(error)
        const unsigned argc = 1;
        Local<Value> argv[argc] = {
            Local<Value>::New(String::New(ctx->error_message))
        };

        ctx_w->errorCallback->Call(Context::GetCurrent()->Global(), argc, argv);
    }
    if (try_catch.HasCaught()) {
        node::FatalException(try_catch);
    }
    delete ctx->input_path;
    sass_free_file_context_wrapper(ctx_w);
}

Handle<Value> RenderFile(const Arguments& args) {
    HandleScope scope;
    sass_file_context* ctx = sass_new_file_context();
    sass_file_context_wrapper* ctx_w = sass_new_file_context_wrapper();
    char *filename;
    String::AsciiValue astr(args[0]);
    Local<Function> callback = Local<Function>::Cast(args[1]);
    Local<Function> errorCallback = Local<Function>::Cast(args[2]);
    String::AsciiValue bstr(args[3]);

    filename = new char[strlen(*astr)+1];
    strcpy(filename, *astr);
    ctx->input_path = filename;
    ctx->options.include_paths = new char[strlen(*bstr)+1];
    strcpy(ctx->options.include_paths, *bstr);
    // ctx->options.output_style = SASS_STYLE_NESTED;
    ctx->options.output_style = args[4]->Int32Value();
    ctx->options.image_path = new char[0];
    ctx->options.source_comments = args[5]->Int32Value();
    ctx_w->ctx = ctx;
    ctx_w->callback = Persistent<Function>::New(callback);
    ctx_w->errorCallback = Persistent<Function>::New(errorCallback);
    ctx_w->request.data = ctx_w;

    int status = uv_queue_work(uv_default_loop(), &ctx_w->request, WorkOnFileContext, (uv_after_work_cb)MakeFileCallback);
    assert(status == 0);

    return scope.Close(Undefined());
}

Handle<Value> RenderFileSync(const Arguments& args) {
    HandleScope scope;
    sass_file_context* ctx = sass_new_file_context();
    char *filename;
    String::AsciiValue astr(args[0]);
    String::AsciiValue bstr(args[1]);

    filename = new char[strlen(*astr)+1];
    strcpy(filename, *astr);
    ctx->input_path = filename;
    ctx->options.include_paths = new char[strlen(*bstr)+1];
    strcpy(ctx->options.include_paths, *bstr);
    ctx->options.image_path = new char[0];
    ctx->options.output_style = args[2]->Int32Value();
    ctx->options.source_comments = args[3]->Int32Value();

    sass_compile_file(ctx);

    filename = NULL;
    delete ctx->input_path;
    ctx->input_path = NULL;
    delete ctx->options.include_paths;
    ctx->options.include_paths = NULL;
    delete ctx->options.image_path;
    ctx->options.image_path = NULL;

    if (ctx->error_status == 0) {
        Local<Value> output = Local<Value>::New(String::New(ctx->output_string));
        sass_free_file_context(ctx);

        return scope.Close(output);
    }
    Local<String> error = String::New(ctx->error_message);
    sass_free_file_context(ctx);

    ThrowException(Exception::Error(error));
    return scope.Close(Undefined());
}

void RegisterModule(v8::Handle<v8::Object> target) {
    NODE_SET_METHOD(target, "oldRender", OldRender);
    NODE_SET_METHOD(target, "render", Render);
    NODE_SET_METHOD(target, "renderSync", RenderSync);
    NODE_SET_METHOD(target, "renderFile", RenderFile);
    NODE_SET_METHOD(target, "renderFileSync", RenderFileSync);
}

NODE_MODULE(binding, RegisterModule);
