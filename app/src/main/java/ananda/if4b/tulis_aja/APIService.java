package ananda.if4b.tulis_aja;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface APIService {
    @GET("post")
    Call<ValueData<List<Post>>> getPost();

    @FormUrlEncoded
    @POST("auth/login")
    Call<ValueData<User>> login(@Field("username") String username,
                          @Field("password") String password);


    @FormUrlEncoded
    @POST("auth/register")
    Call<ValueData<User>> register(@Field("user_id") String user_id,
                             @Field("password") String password);

    @FormUrlEncoded
    @POST("post")
    Call<ValueData<User>> addPost(@Field("username") String username,
                              @Field("content") String content);

    @FormUrlEncoded
    @POST("post")
    Call<ValueData<User>> updatePost(@Field("id") String id,
                              @Field("content") String content);


    @POST("post/{id}")
    Call<ValueData<User>> deletePost(@Path("id") String id);
}
