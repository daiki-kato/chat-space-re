json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y年%-m月%-d日 %-H時%-M分%-S秒")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id